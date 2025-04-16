import React, { useEffect, useState } from 'react';
import { database } from '../../firebaseconfig';
import { 
  getDatabase, 
  ref, 
  onValue, 
  push, 
  update, 
  remove, 
  set,
  get
} from 'firebase/database';
// Imports for authentication
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from "sweetalert2";

const Createwishlist = ({ giftItem }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [activeWishlist, setActiveWishlist] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [dbStatus, setDbStatus] = useState('idle');
  const [refreshKey, setRefreshKey] = useState(0);  // Added refresh key state
  const [showListButton, setShowListButton] = useState(false);  // New state for Show List button
  const [selectedWishlistId, setSelectedWishlistId] = useState(null);  // Track the recently created wishlist

  // Get auth instance from Firebase
  const auth = getAuth();

  // Check database connection on component mount
  useEffect(() => {
    // Test database connection
    const testRef = ref(database, '.info/connected');
    const unsubscribe = onValue(testRef, (snapshot) => {
      const connected = snapshot.val();
      console.log('Firebase database connection status:', connected ? 'connected' : 'disconnected');
      if (connected) {
        setDbStatus('connected');
      } else {
        setDbStatus('disconnected');
      }
    });

    return () => unsubscribe();
  }, []);

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user.email);
        setCurrentUser(user);
        // Force a refresh when user logs in
        setRefreshKey(prevKey => prevKey + 1);
      } else {
        // Handle not logged in state
        console.log('No user authenticated');
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Set up a global listener for changes to the wishlists node
  useEffect(() => {
    if (!database) return;
    
    const wishlistsRef = ref(database, 'wishlists');
    const unsubscribe = onValue(wishlistsRef, () => {
      console.log('Global wishlist change detected');
      // Force refresh by incrementing the refresh key
      setRefreshKey(prevKey => prevKey + 1);
    });
    
    return () => unsubscribe();
  }, [database]);

  // Fetch user's wishlists - now depends on refreshKey to trigger updates
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    console.log('Fetching wishlists for user:', currentUser.email);
    const wishlistsRef = ref(database, 'wishlists');
    
    // Use get() instead of onValue to ensure we get fresh data each time
    get(wishlistsRef).then((snapshot) => {
      console.log('Wishlists snapshot received');
      const data = snapshot.val();
      if (!data) {
        console.log('No wishlists found in database');
        setWishlists([]);
        setLoading(false);
        return;
      }

      console.log('All wishlists:', Object.keys(data).length);

      // Filter wishlists owned by current user
      const userWishlists = Object.entries(data).reduce((acc, [id, wishlist]) => {
        if (wishlist.owner === currentUser.email) {
          acc.push({ id, ...wishlist });
        }
        return acc;
      }, []);

      console.log('User wishlists:', userWishlists.length);
      setWishlists(userWishlists);
      
      // If there are wishlists but no active one selected, select the first one
      if (userWishlists.length > 0 && !activeWishlist) {
        setActiveWishlist(userWishlists[0]);
        fetchWishlistItems(userWishlists[0].id);
      } else if (activeWishlist) {
        // If we already have an active wishlist, refresh its items
        fetchWishlistItems(activeWishlist.id);
      } else {
        setLoading(false);
      }
      
      // Check if we have a selected wishlist ID to focus on
      if (selectedWishlistId) {
        const selectedList = userWishlists.find(list => list.id === selectedWishlistId);
        if (selectedList) {
          setActiveWishlist(selectedList);
          fetchWishlistItems(selectedWishlistId);
        }
      }
    }).catch((error) => {
      console.error('Error fetching wishlists:', error);
      setLoading(false);
    });
    
  }, [currentUser, refreshKey, selectedWishlistId]); // Added selectedWishlistId as dependency

  // Process incoming gift item when it changes
  useEffect(() => {
    if (giftItem && currentUser && wishlists.length > 0) {
      console.log('Received gift item to add:', giftItem);
      // Show wishlist selection modal
      showWishlistSelectionModal(giftItem);
    }
  }, [giftItem, currentUser, wishlists]);

  // Fetch items for the active wishlist - improved with direct get() call
  const fetchWishlistItems = (wishlistId) => {
    if (!wishlistId) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    console.log('Fetching items for wishlist:', wishlistId);
    const itemsRef = ref(database, `wishlists/${wishlistId}/items`);
    
    // Use get() to ensure fresh data
    get(itemsRef).then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log('No items found for this wishlist');
        setWishlistItems([]);
        setLoading(false);
        return;
      }

      const items = Object.entries(data).map(([id, item]) => ({
        id,
        ...item
      }));
      
      console.log("Wishlist items from Firebase:", items);
      setWishlistItems(items);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching wishlist items:', error);
      setLoading(false);
    });
  };

  // Show modal to select which wishlist to add the gift to
  const showWishlistSelectionModal = (gift) => {
    if (!wishlists.length) {
      Swal.fire({
        title: "No Wishlists Found",
        text: "You need to create a wishlist first. Would you like to create one now?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Create Wishlist",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          createNewWishlist(gift);
        }
      });
      return;
    }

    // Create HTML options for all wishlists
    const wishlistOptions = wishlists.map(list => 
      `<option value="${list.id}">${list.title}</option>`
    ).join('');

    Swal.fire({
      title: "Add to Wishlist",
      html: `
        <p>Select a wishlist to add <strong>${gift.name}</strong> to:</p>
        <select id="wishlist-select" class="swal2-input">
          ${wishlistOptions}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Add to Wishlist",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const selectedWishlistId = document.getElementById('wishlist-select').value;
        return selectedWishlistId;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedWishlistId = result.value;
        addGiftToWishlist(gift, selectedWishlistId);
      }
    });
  };

  // Add received gift item to the selected wishlist
  const addGiftToWishlist = (gift, wishlistId) => {
    console.log('Adding gift to wishlist:', wishlistId, gift);
    setDbStatus('writing');
    
    // Transform the gift item format to match wishlist item format
    const newItem = {
      name: gift.name,
      imageUrl: gift.imageUrl || "",
      link: gift.websiteLink || "",
      category: gift.category || "Other",
      price: gift.price ? parseFloat(gift.price) : null,
      description: gift.description || "",
      priority: 3, // Default priority
      addedAt: new Date().toISOString(),
      brand: gift.brand || "",
      rating: gift.rating || null
    };
    
    console.log('New item data:', newItem);
    const itemsRef = ref(database, `wishlists/${wishlistId}/items`);
    const newItemRef = push(itemsRef);
    
    set(newItemRef, newItem)
      .then(() => {
        console.log('Item added successfully with key:', newItemRef.key);
        setDbStatus('success');
        
        // Find the wishlist title for the success message
        const wishlistTitle = wishlists.find(list => list.id === wishlistId)?.title || "your wishlist";
        
        // Show success message with "Show this list" button option
        Swal.fire({
          title: "Success!",
          text: `${gift.name} has been added to ${wishlistTitle}`,
          icon: "success",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          showConfirmButton: true,
          confirmButtonText: "Show this list",
        }).then((result) => {
          if (result.isConfirmed) {
            // Set this wishlist as active and show it
            setSelectedWishlistId(wishlistId);
            const selectedWishlist = wishlists.find(list => list.id === wishlistId);
            if (selectedWishlist) {
              setActiveWishlist(selectedWishlist);
              fetchWishlistItems(wishlistId);
            }
          }
        });
        
        // Set this wishlist as active in background
        const selectedWishlist = wishlists.find(list => list.id === wishlistId);
        if (selectedWishlist) {
          setActiveWishlist(selectedWishlist);
          // Force refresh the data
          setRefreshKey(prevKey => prevKey + 1);
          // Directly fetch items for this wishlist
          fetchWishlistItems(wishlistId);
        }
      })
      .catch(error => {
        console.error("Error adding item:", error);
        setDbStatus('error');
        Swal.fire({
          title: "Error!",
          text: `Failed to add item: ${error.message}`,
          icon: "error"
        });
      });
  };

  const createNewWishlist = (giftToAdd = null) => {
    if (!currentUser) {
      alert("You must be logged in to create a wishlist");
      return;
    }

    console.log('Creating new wishlist for user:', currentUser.email);
    setDbStatus('writing');

    const title = prompt("Enter wishlist title:");
    if (!title) {
      setDbStatus('idle');
      return;
    }

    const description = prompt("Enter wishlist description (optional):");
    const privacySetting = prompt("Set privacy (public or private):", "private");
    const newWishlist = {
      owner: currentUser.email,
      title,
      description: description || "",
      createdAt: new Date().toISOString(),
      privacy: privacySetting === "public" ? "public" : "private"
    };

    // Check if database is properly initialized
    if (!database) {
      console.error("Firebase database not initialized");
      alert("Database connection error. Please try again later.");
      setDbStatus('error');
      return;
    }

    const wishlistsRef = ref(database, 'wishlists');
    const newWishlistRef = push(wishlistsRef);
    
    console.log('Saving new wishlist with key:', newWishlistRef.key);
    
    set(newWishlistRef, newWishlist)
      .then(() => {
        console.log('Wishlist created successfully');
        setDbStatus('success');
        const newWishlistId = newWishlistRef.key;
        const completeWishlist = { id: newWishlistId, ...newWishlist };
        
        // Store the new wishlist ID for focusing
        setSelectedWishlistId(newWishlistId);
        setActiveWishlist(completeWishlist);
        
        // Force refresh the data
        setRefreshKey(prevKey => prevKey + 1);
        
        // If there was a gift item waiting to be added, add it now
        if (giftToAdd) {
          addGiftToWishlist(giftToAdd, newWishlistId);
        } else {
          // If no gift item, show success with "Show this list" button
          Swal.fire({
            title: "Success!",
            text: `New wishlist "${title}" created!`,
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Show this list"
          }).then((result) => {
            if (result.isConfirmed) {
              // Already set above, but make sure it's focused
              setActiveWishlist(completeWishlist);
              fetchWishlistItems(newWishlistId);
            }
          });
        }
      })
      .catch(error => {
        console.error("Error creating wishlist:", error);
        setDbStatus('error');
        alert(`Failed to create wishlist: ${error.message}`);
      });
  };

  const selectWishlist = (wishlist) => {
    console.log('Selecting wishlist:', wishlist.id);
    setActiveWishlist(wishlist);
    fetchWishlistItems(wishlist.id);
    setSelectedWishlistId(wishlist.id); // Track the selected wishlist
  };

  const shareWishlist = (wishlistId) => {
    const email = prompt("Enter email address to share with:");
    if (!email) return;

    console.log('Sharing wishlist', wishlistId, 'with', email);
    setDbStatus('writing');

    const shareRef = ref(database, `wishlists/${wishlistId}/shares`);
    const newShareRef = push(shareRef);
    
    set(newShareRef, {
      email,
      status: "Shared",
      sharedAt: new Date().toISOString()
    })
      .then(() => {
        console.log('Wishlist shared successfully');
        setDbStatus('success');
        alert(`Wishlist shared with ${email}`);
      })
      .catch(error => {
        console.error("Error sharing wishlist:", error);
        setDbStatus('error');
        alert(`Failed to share wishlist: ${error.message}`);
      });
  };

  const deleteWishlist = (wishlistId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this wishlist? This action cannot be undone.");
    
    if (confirmDelete) {
      console.log('Deleting wishlist:', wishlistId);
      setDbStatus('writing');
      
      const wishlistRef = ref(database, `wishlists/${wishlistId}`);
      
      remove(wishlistRef)
        .then(() => {
          console.log('Wishlist deleted successfully');
          setDbStatus('success');
          alert('Wishlist deleted successfully');
          if (activeWishlist && activeWishlist.id === wishlistId) {
            setActiveWishlist(null);
            setWishlistItems([]);
            setSelectedWishlistId(null); // Clear selected wishlist
          }
          // Force refresh data
          setRefreshKey(prevKey => prevKey + 1);
        })
        .catch(error => {
          console.error("Error deleting wishlist:", error);
          setDbStatus('error');
          alert(`Failed to delete wishlist: ${error.message}`);
        });
    }
  };

  const addItemToWishlist = () => {
    if (!activeWishlist) {
      alert("Please select a wishlist first");
      return;
    }

    console.log('Adding item to wishlist:', activeWishlist.id);
    setDbStatus('writing');

    // Simple prompt-based implementation
    const name = prompt("Enter item name:");
    if (!name) {
      setDbStatus('idle');
      return;
    }
    
    const imageUrl = prompt("Enter image URL:");
    if (!imageUrl) {
      setDbStatus('idle');
      return;
    }
    
    const link = prompt("Enter website URL (optional):");
    const category = prompt("Enter category (Clothing, Electronics, Books, Home, Other):");
    const price = prompt("Enter price (e.g. 99.99):");
    const description = prompt("Enter description or notes (optional):");
    const priority = prompt("Enter priority (1-5, with 5 being highest):", "3");
    
    // Create a new wishlist item
    const newItem = {
      name,
      imageUrl,
      link: link || "",
      category: category || "Other",
      price: price ? parseFloat(price) : null,
      description: description || "",
      priority: parseInt(priority) || 3,
      addedAt: new Date().toISOString()
    };
    
    console.log('New item data:', newItem);
    const itemsRef = ref(database, `wishlists/${activeWishlist.id}/items`);
    const newItemRef = push(itemsRef);
    
    set(newItemRef, newItem)
      .then(() => {
        console.log('Item added successfully with key:', newItemRef.key);
        setDbStatus('success');
        
        // Show success with "Show this list" option
        Swal.fire({
          title: "Success!",
          text: `Item "${name}" added to your wishlist!`,
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Show this list"
        }).then((result) => {
          if (result.isConfirmed) {
            // Just refresh the current wishlist items
            fetchWishlistItems(activeWishlist.id);
          }
        });
        
        // Force refresh items in background
        fetchWishlistItems(activeWishlist.id);
      })
      .catch(error => {
        console.error("Error adding item:", error);
        setDbStatus('error');
        alert(`Failed to add item: ${error.message}`);
      });
  };

  const viewItemDetails = (item) => {
    const detailsMessage = `
      Name: ${item.name}
      Category: ${item.category || 'Not specified'}
      Price: ${item.price ? `$${item.price.toFixed(2)}` : 'Not specified'}
      Priority: ${item.priority || 'Not specified'}
      ${item.description ? `Description: ${item.description}` : ''}
      ${item.addedAt ? `Added on: ${new Date(item.addedAt).toLocaleDateString()}` : ''}
    `;
    
    alert(detailsMessage);
    
    // Ask if user wants to visit website
    if (item.link) {
      const visitSite = window.confirm("Would you like to visit the item's website?");
      if (visitSite) {
        window.open(item.link, '_blank');
      }
    }
  };

  const visitItemWebsite = (link) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('No Link Available: This item does not have a website link.');
    }
  };

  const deleteWishlistItem = (itemId) => {
    if (!activeWishlist) return;
    
    console.log("Trying to delete item:", itemId);
    setDbStatus('writing');
    
    const confirmDelete = window.confirm("Are you sure? You won't be able to revert this!");
    
    if (confirmDelete) {
      const itemRef = ref(database, `wishlists/${activeWishlist.id}/items/${itemId}`);
      
      remove(itemRef)
        .then(() => {
          console.log('Item deleted successfully');
          setDbStatus('success');
          alert('Deleted! Your wishlist item has been deleted.');
          // Refresh the items list
          fetchWishlistItems(activeWishlist.id);
        })
        .catch(err => {
          console.error("Delete error:", err);
          setDbStatus('error');
          alert('Error! Could not delete the item. Please try again.');
        });
    } else {
      setDbStatus('idle');
    }
  };

  const editWishlistItem = (item) => {
    if (!activeWishlist) return;
    
    console.log("Editing item with ID:", item.id);
    setDbStatus('writing');
    
    // Simple prompt-based implementation
    const name = prompt("Enter item name:", item.name || '');
    if (!name) {
      setDbStatus('idle');
      return;
    }
    
    const imageUrl = prompt("Enter image URL:", item.imageUrl || '');
    if (!imageUrl) {
      setDbStatus('idle');
      return;
    }
    
    const link = prompt("Enter website URL (optional):", item.link || '');
    const category = prompt("Enter category (Clothing, Electronics, Books, Home, Other):", item.category || '');
    const price = prompt("Enter price (e.g. 99.99):", item.price || '');
    const description = prompt("Enter description or notes (optional):", item.description || '');
    const priority = prompt("Enter priority (1-5, with 5 being highest):", item.priority || '3');
    
    // Update the item
    const updatedItem = {
      name,
      imageUrl,
      link: link || "",
      category: category || "Other",
      price: price ? parseFloat(price) : null,
      description: description || "",
      priority: parseInt(priority) || 3,
      addedAt: item.addedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('Updated item data:', updatedItem);
    const itemRef = ref(database, `wishlists/${activeWishlist.id}/items/${item.id}`);
    
    update(itemRef, updatedItem)
      .then(() => {
        console.log('Item updated successfully');
        setDbStatus('success');
        
        // Show success with "Show this list" option
        Swal.fire({
          title: "Success!",
          text: `Item "${name}" updated successfully!`,
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Show this list"
        }).then((result) => {
          if (result.isConfirmed) {
            // Just refresh the current wishlist items
            fetchWishlistItems(activeWishlist.id);
          }
        });
        
        // Refresh the items in background
        fetchWishlistItems(activeWishlist.id);
      })
      .catch(error => {
        console.error("Error updating item:", error);
        setDbStatus('error');
        alert(`Failed to update item: ${error.message}`);
      });
  };

  const showThisList = () => {
    if (selectedWishlistId) {
      const selectedList = wishlists.find(list => list.id === selectedWishlistId);
      if (selectedList) {
        setActiveWishlist(selectedList);
        fetchWishlistItems(selectedWishlistId);
      }
    }
  };

  // Display database connection status
  const renderDbStatus = () => {
    if (dbStatus === 'disconnected') {
      return <div className="db-status error">Database disconnected! Check your connection.</div>;
    }
    if (dbStatus === 'error') {
      return <div className="db-status error">Database operation failed! Check console for details.</div>;
    }
    if (dbStatus === 'writing') {
      return <div className="db-status writing">Saving to database...</div>;
    }
    if (dbStatus === 'success') {
      return <div className="db-status success">Database updated successfully!</div>;
    }
    return null;
  };

  const renderWishlistSelector = () => {
    return (
      <div className="wishlist-selector">
        <h2>My Wishlists</h2>
        <div className="wishlist-actions">
          <button onClick={() => createNewWishlist()}>Create New Wishlist</button>
          {selectedWishlistId && (
            <button onClick={showThisList} className="show-list-btn">Show this list</button>
          )}
        </div>
        <div className="wishlists-list">
          {wishlists.length === 0 ? (
            <p>You haven't created any wishlists yet</p>
          ) : (
            wishlists.map(wishlist => (
              <div 
                key={wishlist.id} 
                className={`wishlist-entry ${activeWishlist && activeWishlist.id === wishlist.id ? 'active' : ''}`}
                onClick={() => selectWishlist(wishlist)}
              >
                <h3>{wishlist.title}</h3>
                <p>{wishlist.description}</p>
                <div className="wishlist-meta">
                  <span>Privacy: {wishlist.privacy}</span>
                  <span>Created: {new Date(wishlist.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="wishlist-actions">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    shareWishlist(wishlist.id);
                  }}>Share</button>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    deleteWishlist(wishlist.id);
                  }}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderWishlistItems = () => {
    if (!activeWishlist) {
      return (
        <div className="no-wishlist-selected">
          <h2>No wishlist selected</h2>
          <p>Please select a wishlist or create a new one.</p>
        </div>
      );
    }

    if (loading) {
      return <div className="loading">Loading your wishlist items...</div>;
    }

    return (
      <div className="wishlist-view">
        <div className="wishlist-header">
          <h2>{activeWishlist.title}</h2>
          <p>{activeWishlist.description}</p>
          <div className="add-item-container">
            <button onClick={addItemToWishlist}>Add Item to Wishlist</button>
            {selectedWishlistId === activeWishlist.id && (
              <button onClick={showThisList} className="show-list-btn">Show this list</button>
            )}
          </div>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>You haven't added any items to this wishlist yet</p>
          </div>
        ) : (
          <div className="wishlist-container">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="item-image" onClick={() => item.link && visitItemWebsite(item.link)}>
                  <img src={item.imageUrl || "https://via.placeholder.com/150"} alt={item.name} />
                  {item.price && <div className="item-price">${item.price.toFixed(2)}</div>}
                </div>
                <div className="item-content">
                  <h3>{item.name}</h3>
                  <div className="item-category">Category: {item.category}</div>
                  {item.description && <div className="item-description">{item.description}</div>}
                  <div className="item-priority">Priority: {item.priority}/5</div>
                  <div className="item-actions">
                    <button onClick={() => viewItemDetails(item)}>View Details</button>
                    <button onClick={() => editWishlistItem(item)}>Edit</button>
                    <button onClick={() => deleteWishlistItem(item.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="wishlist-page">
        <h1>My Wishlist</h1>
        <div className="auth-required">
          <p>Please log in to view and manage your wishlists</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist Manager</h1>
      {renderDbStatus()}
      <div className="wishlist-dashboard">
        {renderWishlistSelector()}
        {renderWishlistItems()}
      </div>
      
      
    </div>
  );
};

export default Createwishlist;