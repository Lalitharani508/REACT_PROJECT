import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'animate.css';
import { 
  FaGift, 
  FaPlus, 
  FaHeart, 
  FaTrash, 
  FaEdit, 
  FaEye, 
  FaSpinner,
  FaExternalLinkAlt,
  FaShoppingCart,
  FaTag
} from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const Createwishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [deletedone, setDeletedone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, [deletedone]);

  const fetchWishlist = () => {
    setLoading(true);
    axios.get("http://localhost:4000/your_wishlist")
      .then(res => {
        console.log("Wishlist data from server:", res.data);
        // Check that each item has an ID property
        const itemsWithIds = res.data.map(item => {
          console.log("Item ID:", item.id);
          return item;
        });
        setWishlist(itemsWithIds);
        setLoading(false);
        
        // Show success notification
        Swal.fire({
          title: 'Wishlist Loaded!',
          text: `${res.data.length} items found in your wishlist`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        
        // Show error notification
        Swal.fire({
          title: 'Error!',
          text: 'Could not load your wishlist. Please try again later.',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__shakeX'
          }
        });
      });
  };

  const createNewWishlist = () => {
    Swal.fire({
      title: 'Add Item to Wishlist',
      html: `
        <div class="mb-3">
          <input id="itemName" class="swal2-input" placeholder="Item Name">
        </div>
        <div class="mb-3">
          <input id="itemImageUrl" class="swal2-input" placeholder="Image URL">
        </div>
        <div class="mb-3">
          <input id="itemWebsiteLink" class="swal2-input" placeholder="Website URL (to redirect when clicked)">
        </div>
        <div class="mb-3">
          <select id="itemCategory" class="swal2-input">
            <option value="">Select Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Home">Home & Kitchen</option>
            <option value="Birthday">Birthday</option>
            <option value="Christmas">Christmas</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Wedding">Wedding</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="mb-3">
          <input id="itemPrice" class="swal2-input" placeholder="Price (e.g. 99.99)">
        </div>
        <div class="mb-3">
          <input id="itemBrand" class="swal2-input" placeholder="Brand">
        </div>
        <div class="mb-3">
          <textarea id="itemDescription" class="swal2-textarea" placeholder="Description or Notes"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add to Wishlist',
      width: '600px',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      },
      preConfirm: () => {
        const name = document.getElementById('itemName').value;
        const imageUrl = document.getElementById('itemImageUrl').value;
        const websiteLink = document.getElementById('itemWebsiteLink').value;
        const category = document.getElementById('itemCategory').value;
        const price = document.getElementById('itemPrice').value;
        const brand = document.getElementById('itemBrand').value;
        const description = document.getElementById('itemDescription').value;
        
        if (!name) {
          Swal.showValidationMessage('Please enter an item name');
          return false;
        }
        
        if (!imageUrl) {
          Swal.showValidationMessage('Please enter an image URL');
          return false;
        }
        
        // Create a new wishlist item (without client-side ID)
        const newItem = {
          // Remove the id: Date.now() line to let the server generate the ID
          name,
          imageUrl,
          websiteLink,
          category,
          price: price ? parseFloat(price) : null,
          brand,
          description,
          dateAdded: new Date().toISOString()
        };
        
        // Return a promise to work with SweetAlert2's preConfirm
        return axios.post("http://localhost:4000/your_wishlist", newItem)
          .then(response => {
            console.log("Server response after adding item:", response.data);
            // Use the server-returned item with its generated ID
            setWishlist([...wishlist, response.data]);
            return true;
          })
          .catch(error => {
            console.error("Error adding item:", error);
            Swal.showValidationMessage(`Failed to add item: ${error.message}`);
            return false;
          });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Item added to your wishlist',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          }
        });
      }
    });
  };

  const viewGift = (item) => {
    Swal.fire({
      title: item.name,
      html: `
        <div class="mb-3">
          <strong>Category:</strong> ${item.category || 'Not specified'}
        </div>
        ${item.brand ? `<div class="mb-3"><strong>Brand:</strong> ${item.brand}</div>` : ''}
        ${item.price ? `<div class="mb-3"><strong>Price:</strong> $${item.price.toFixed(2)}</div>` : ''}
        ${item.description ? `<div class="mb-3"><strong>Description:</strong><br>${item.description}</div>` : ''}
        ${item.dateAdded ? `<div class="mb-3"><small class="text-muted">Added on: ${new Date(item.dateAdded).toLocaleDateString()}</small></div>` : ''}
      `,
      imageUrl: item.imageUrl || 'https://via.placeholder.com/150',
      imageWidth: 300,
      imageHeight: 300,
      showCancelButton: true,
      confirmButtonText: 'Visit Website',
      cancelButtonText: 'Close',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    }).then((result) => {
      if (result.isConfirmed && item.websiteLink) {
        // Redirect to the item's website
        window.open(item.websiteLink, '_blank');
      }
    });
  };

  const visitItemWebsite = (link) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      Swal.fire({
        title: 'No Link Available',
        text: 'This item does not have a website link.',
        icon: 'info'
      });
    }
  };

  const deleteWishlist = (item) => {
    console.log("Trying to delete item:", item);
    console.log("Item ID to delete:", item.id);
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Make the delete API call
        axios.delete(`http://localhost:4000/your_wishlist/${item.id}`)
          .then(response => {
            console.log("Delete response:", response);
            console.log("Item deleted:", item);
            
            // Update local state to reflect deletion
            setWishlist(wishlist.filter(listItem => listItem.id !== item.id));
            
            // Toggle deleted state to trigger useEffect
            setDeletedone(!deletedone);
            
            // Show success notification
            Swal.fire({
              title: 'Deleted!',
              text: 'Your wishlist item has been deleted.',
              icon: 'success',
              showClass: {
                popup: 'animate__animated animate__fadeIn'
              }
            });
          })
          .catch(err => {
            console.error("Delete error:", err);
            console.error("Response data:", err.response ? err.response.data : "No response data");
            console.error("Status:", err.response ? err.response.status : "No status");
            
            // Show error notification
            Swal.fire({
              title: 'Error!',
              text: 'Could not delete the item. Please try again.',
              icon: 'error',
              showClass: {
                popup: 'animate__animated animate__shakeX'
              }
            });
          });
      }
    });
  };

  const editWishlistItem = (item) => {
    console.log("Editing item with ID:", item.id);
    
    Swal.fire({
      title: 'Edit Wishlist Item',
      html: `
        <div class="mb-3">
          <input id="itemName" class="swal2-input" placeholder="Item Name" value="${item.name || ''}">
        </div>
        <div class="mb-3">
          <input id="itemImageUrl" class="swal2-input" placeholder="Image URL" value="${item.imageUrl || ''}">
        </div>
        <div class="mb-3">
          <input id="itemWebsiteLink" class="swal2-input" placeholder="Website URL" value="${item.websiteLink || ''}">
        </div>
        <div class="mb-3">
          <select id="itemCategory" class="swal2-input">
            <option value="">Select Category</option>
            <option value="Clothing" ${item.category === 'Clothing' ? 'selected' : ''}>Clothing</option>
            <option value="Electronics" ${item.category === 'Electronics' ? 'selected' : ''}>Electronics</option>
            <option value="Books" ${item.category === 'Books' ? 'selected' : ''}>Books</option>
            <option value="Home" ${item.category === 'Home' ? 'selected' : ''}>Home & Kitchen</option>
            <option value="Birthday" ${item.category === 'Birthday' ? 'selected' : ''}>Birthday</option>
            <option value="Christmas" ${item.category === 'Christmas' ? 'selected' : ''}>Christmas</option>
            <option value="Anniversary" ${item.category === 'Anniversary' ? 'selected' : ''}>Anniversary</option>
            <option value="Wedding" ${item.category === 'Wedding' ? 'selected' : ''}>Wedding</option>
            <option value="Other" ${item.category === 'Other' ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div class="mb-3">
          <input id="itemPrice" class="swal2-input" placeholder="Price (e.g. 99.99)" value="${item.price || ''}">
        </div>
        <div class="mb-3">
          <input id="itemBrand" class="swal2-input" placeholder="Brand" value="${item.brand || ''}">
        </div>
        <div class="mb-3">
          <textarea id="itemDescription" class="swal2-textarea" placeholder="Description or Notes">${item.description || ''}</textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      width: '600px',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      },
      preConfirm: () => {
        const name = document.getElementById('itemName').value;
        const imageUrl = document.getElementById('itemImageUrl').value;
        const websiteLink = document.getElementById('itemWebsiteLink').value;
        const category = document.getElementById('itemCategory').value;
        const price = document.getElementById('itemPrice').value;
        const brand = document.getElementById('itemBrand').value;
        const description = document.getElementById('itemDescription').value;
        
        if (!name) {
          Swal.showValidationMessage('Please enter an item name');
          return false;
        }
        
        if (!imageUrl) {
          Swal.showValidationMessage('Please enter an image URL');
          return false;
        }
        
        // Update the item
        const updatedItem = {
          ...item,
          name,
          imageUrl,
          websiteLink,
          category,
          price: price ? parseFloat(price) : null,
          brand,
          description,
          lastUpdated: new Date().toISOString()
        };
        
        // Return a promise for SweetAlert2's preConfirm
        return axios.put(`http://localhost:4000/your_wishlist/${item.id}`, updatedItem)
          .then(response => {
            console.log("Update response:", response);
            // Update local state with the server response data
            setWishlist(wishlist.map(i => i.id === item.id ? response.data : i));
            return true;
          })
          .catch(error => {
            console.error("Error updating item:", error);
            console.error("Response data:", error.response ? error.response.data : "No response data");
            Swal.showValidationMessage(`Failed to update item: ${error.message}`);
            return false;
          });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Item updated successfully',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          }
        });
      }
    });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="animate__animated animate__pulse animate__infinite">
          <FaSpinner className="fa-spin" size={30} />
          <h3 className="mt-3">Loading your wishlist items...</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 animate__animated animate__fadeIn">
        <FaHeart className="text-danger me-2" /> My Wishlist
      </h1>
      
      <Row className="mb-5">
        <Col xs={12} md={4} className="mx-auto">
          <div 
            className="animate__animated animate__fadeIn wishlist-create-box"
            onClick={createNewWishlist}
            style={{
              border: "2px dashed #007bff",
              borderRadius: "10px",
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor: "#f8f9fa",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaPlus size={40} className="text-primary mb-3 animate__animated animate__heartBeat animate__infinite" />
            <h4>Add Item to Wishlist</h4>
          </div>
        </Col>
      </Row>
      
      {wishlist.length === 0 && !loading ? (
        <div className="text-center mt-5 animate__animated animate__fadeIn">
          <FaGift size={50} className="text-muted mb-3" />
          <h3>You haven't added any items to your wishlist yet</h3>
          <p className="text-muted">Click the box above to add your first item!</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {wishlist.map((item, index) => (
            <Col key={item.id || index}>
              <Card 
                className="h-100 animate__animated animate__fadeIn"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div 
                  style={{ 
                    position: 'relative', 
                    cursor: item.websiteLink ? 'pointer' : 'default',
                    height: '200px',
                    overflow: 'hidden' 
                  }}
                  onClick={() => item.websiteLink && visitItemWebsite(item.websiteLink)}
                >
                  <Card.Img 
                    variant="top" 
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    className="animate__animated animate__zoomIn"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  {item.websiteLink && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '50%',
                        padding: '5px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}
                    >
                      <FaExternalLinkAlt className="text-primary" />
                    </div>
                  )}
                  {item.price && (
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}
                    >
                      <FaTag className="me-1" /> ${item.price.toFixed(2)}
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaGift className="text-primary me-2" /> 
                    {item.name}
                  </Card.Title>
                  <div className="mb-2">
                    {item.brand && (
                      <div className="text-muted small mb-1">
                        Brand: {item.brand}
                      </div>
                    )}
                    {item.category && (
                      <div className="d-flex align-items-center text-muted small">
                        <MdCategory className="me-1" />
                        {item.category}
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <Card.Text className="small text-truncate">
                      {item.description}
                    </Card.Text>
                  )}
                  <div className="d-flex justify-content-between mt-3">
                    <Button 
                      variant="primary" 
                      className="animate__animated animate__pulse animate__delay-1s"
                      onClick={() => viewGift(item)}
                    >
                      <FaEye className="me-2" /> Details
                    </Button>
                    <div>
                      <Button 
                        variant="outline-secondary"
                        className="me-2"
                        onClick={() => editWishlistItem(item)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        onClick={() => deleteWishlist(item)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Createwishlist;