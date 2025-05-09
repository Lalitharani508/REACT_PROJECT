import React, { useEffect, useState } from "react";
import { database } from "../../firebaseconfig";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove,
  set,
  get,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import "animate.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  Spinner,
  Alert,
  Form,
  Modal,
} from "react-bootstrap";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaShare,
  FaEye,
  FaLink,
  FaShoppingBasket,
  FaListUl,
  // FaGift
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { generateEmailHtml } from "../Email_Template/EmailTemplate";
const Createwishlist = ({ giftItem }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [activeWishlist, setActiveWishlist] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState("idle");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedWishlistId, setSelectedWishlistId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWishlistTitle, setNewWishlistTitle] = useState("");
  const [newWishlistDesc, setNewWishlistDesc] = useState("");
  const [newWishlistPrivacy, setNewWishlistPrivacy] = useState("private");

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("1m2P7j9PCId-S9AVJ");
  }, []);

  const auth = getAuth();
  // Database connection check (same as before)
  useEffect(() => {
    const testRef = ref(database, ".info/connected");
    const unsubscribe = onValue(testRef, (snapshot) => {
      const connected = snapshot.val();
      setDbStatus(connected ? "connected" : "disconnected");
    });
    return () => unsubscribe();
  }, []);

  // Authentication listener (same as before)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Fetch wishlists (same as before)
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const wishlistsRef = ref(database, "wishlists");
    get(wishlistsRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setWishlists([]);
          setLoading(false);
          return;
        }

        const userWishlists = Object.entries(data).reduce(
          (acc, [id, wishlist]) => {
            if (wishlist.owner === currentUser.email) {
              acc.push({ id, ...wishlist });
            }
            return acc;
          },
          []
        );

        setWishlists(userWishlists);

        if (userWishlists.length > 0 && !activeWishlist) {
          setActiveWishlist(userWishlists[0]);
          fetchWishlistItems(userWishlists[0].id);
        } else if (activeWishlist) {
          fetchWishlistItems(activeWishlist.id);
        } else {
          setLoading(false);
        }

        if (selectedWishlistId) {
          const selectedList = userWishlists.find(
            (list) => list.id === selectedWishlistId
          );
          if (selectedList) {
            setActiveWishlist(selectedList);
            fetchWishlistItems(selectedWishlistId);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching wishlists:", error);
        setLoading(false);
      });
  }, [currentUser, refreshKey, selectedWishlistId]);

  // Process incoming gift item
  useEffect(() => {
    if (giftItem && currentUser && wishlists.length > 0) {
      showWishlistSelectionModal(giftItem);
    }
  }, [giftItem, currentUser, wishlists]);

  const fetchWishlistItems = (wishlistId) => {
    if (!wishlistId) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const itemsRef = ref(database, `wishlists/${wishlistId}/items`);

    get(itemsRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setWishlistItems([]);
          setLoading(false);
          return;
        }

        const items = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));

        setWishlistItems(items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
        setLoading(false);
      });
  };
  // console.log(fetchWishlistItems())

  const showWishlistSelectionModal = (gift) => {
    if (!wishlists.length) {
      Swal.fire({
        title: "No Wishlists Found",
        text: "You need to create a wishlist first. Would you like to create one now?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Create Wishlist",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "animate__animated animate__fadeIn",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setShowCreateModal(true);
        }
      });
      return;
    }

    Swal.fire({
      title: `Add "${gift.name}" to Wishlist`,
      input: "select",
      inputOptions: wishlists.reduce((options, list) => {
        options[list.id] = list.title;
        return options;
      }, {}),
      inputPlaceholder: "Select a wishlist",
      showCancelButton: true,
      confirmButtonText: "Add to Wishlist",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        addGiftToWishlist(gift, result.value);
      }
    });
  };

  const addGiftToWishlist = (gift, wishlistId) => {
    setDbStatus("writing");

    const newItem = {
      name: gift.name,
      imageUrl: gift.imageUrl || "",
      link: gift.websiteLink || "",
      category: gift.category || "Other",
      price: gift.price ? parseFloat(gift.price) : null,
      description: gift.description || "",
      priority: 3,
      addedAt: new Date().toISOString(),
      brand: gift.brand || "",
      rating: gift.rating || null,
    };

    const itemsRef = ref(database, `wishlists/${wishlistId}/items`);
    const newItemRef = push(itemsRef);

    set(newItemRef, newItem)
      .then(() => {
        setDbStatus("success");
        const wishlistTitle =
          wishlists.find((list) => list.id === wishlistId)?.title ||
          "your wishlist";

        Swal.fire({
          title: "Success!",
          html: `<p class="animate__animated animate__tada"><FaGift /> ${gift.name} has been added to ${wishlistTitle}</p>`,
          // icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Show this list",
          customClass: {
            popup: "animate__animated animate__fadeIn",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setSelectedWishlistId(wishlistId);
            const selectedWishlist = wishlists.find(
              (list) => list.id === wishlistId
            );
            if (selectedWishlist) {
              setActiveWishlist(selectedWishlist);
              fetchWishlistItems(wishlistId);
            }
          }
        });

        const selectedWishlist = wishlists.find(
          (list) => list.id === wishlistId
        );
        if (selectedWishlist) {
          setActiveWishlist(selectedWishlist);
          setRefreshKey((prevKey) => prevKey + 1);
          fetchWishlistItems(wishlistId);
        }
      })
      .catch((error) => {
        setDbStatus("error");
        Swal.fire({
          title: "Error!",
          text: `Failed to add item: ${error.message}`,
          icon: "error",
          customClass: {
            popup: "animate__animated animate__shakeX",
          },
        });
      });
  };

  const handleCreateWishlist = () => {
    if (!newWishlistTitle.trim()) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter a title for your wishlist",
        icon: "warning",
        customClass: {
          popup: "animate__animated animate__headShake",
        },
      });
      return;
    }

    setDbStatus("writing");
    const newWishlist = {
      owner: currentUser.email,
      title: newWishlistTitle,
      description: newWishlistDesc,
      createdAt: new Date().toISOString(),
      privacy: newWishlistPrivacy,
    };

    const wishlistsRef = ref(database, "wishlists");
    const newWishlistRef = push(wishlistsRef);

    set(newWishlistRef, newWishlist)
      .then(() => {
        setDbStatus("success");
        setShowCreateModal(false);
        setNewWishlistTitle("");
        setNewWishlistDesc("");
        setNewWishlistPrivacy("private");

        const newWishlistId = newWishlistRef.key;
        setSelectedWishlistId(newWishlistId);
        setRefreshKey((prevKey) => prevKey + 1);

        Swal.fire({
          title: "Success!",
          html: `<p class="animate__animated animate__tada"><FaListUl /> Wishlist "${newWishlistTitle}" created!</p>`,
          // icon: "success",
          showConfirmButton: true,
          // confirmButtonText: "Show my wishlist",
          customClass: {
            popup: "animate__animated animate__fadeIn",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setActiveWishlist({ id: newWishlistId, ...newWishlist });
            fetchWishlistItems(newWishlistId);
          }
        });
      })
      .catch((error) => {
        setDbStatus("error");
        Swal.fire({
          title: "Error!",
          text: `Failed to create wishlist: ${error.message}`,
          icon: "error",
          customClass: {
            popup: "animate__animated animate__shakeX",
          },
        });
      });
  };

  const selectWishlist = (wishlist) => {
    setActiveWishlist(wishlist);
    fetchWishlistItems(wishlist.id);
    setSelectedWishlistId(wishlist.id);
  };

  const shareWishlist = (wishlistId) => {
    const htmlContent = generateEmailHtml(wishlistItems)
    console.log(htmlContent)
    Swal.fire({
      title: "Share Wishlist",
      input: "email",
      inputPlaceholder: "Enter recipient's email",
      showCancelButton: true,
      confirmButtonText: "Share",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setDbStatus("writing");
        const recipientEmail = result.value;

        // First, save to Firebase database.
        const shareRef = ref(database, `wishlists/${wishlistId}/shares`);
        const newShareRef = push(shareRef);

        // Get wishlist data to include in the email
        get(ref(database, `wishlists/${wishlistId}`))
          .then((wishlistSnapshot) => {
            const wishlistData = wishlistSnapshot.val();

            set(newShareRef, {
              email: recipientEmail,
              status: "Shared",
              sharedAt: new Date().toISOString(),
            })
              .then(() => {
                // Now send email notification with EmailJS
                const templateParams = {
                  to_email: recipientEmail,
                  from_name: wishlistData.createdBy || "A friend",
                  wishlist_name: wishlistData.name || "My Wishlist",
                  wishlist_link: `${window.location.origin}/wishlist/${wishlistId}`,
                  // message: `${
                  //   wishlistData.createdBy || "Someone"
                  // } has shared a wishlist with you!`,
                  // wishlist_items_html: htmlContent
                  message: `${
                    wishlistData.createdBy || "Someone"
                  } has shared a wishlist with you!`,
                  wishlist_items_html: htmlContent,
                };

                return emailjs.send(
                  "service_82adl3h",
                  "template_86172xt",
                  templateParams
                );
              })
              .then(() => {
                setDbStatus("success");
                Swal.fire({
                  title: "Shared!",
                  text: `Wishlist shared with ${recipientEmail}`,
                  icon: "success",
                  customClass: {
                    popup: "animate__animated animate__tada",
                  },
                });
              })
              .catch((error) => {
                setDbStatus("error");
                Swal.fire({
                  title: "Error!",
                  text: `Failed to share wishlist: ${error.message}`,
                  icon: "error",
                  customClass: {
                    popup: "animate__animated animate__shakeX",
                  },
                });
              });
          })
          .catch((error) => {
            setDbStatus("error");
            Swal.fire({
              title: "Error!",
              text: `Failed to fetch wishlist data: ${error.message}`,
              icon: "error",
              customClass: {
                popup: "animate__animated animate__shakeX",
              },
            });
          });
      }
    });
  };


  const deleteWishlist = (wishlistId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setDbStatus("writing");
        const wishlistRef = ref(database, `wishlists/${wishlistId}`);

        remove(wishlistRef)
          .then(() => {
            setDbStatus("success");
            Swal.fire({
              title: "Deleted!",
              text: "Your wishlist has been deleted.",
              // icon: "success",
              customClass: {
                popup: "animate__animated animate__tada",
              },
            });
            if (activeWishlist && activeWishlist.id === wishlistId) {
              setActiveWishlist(null);
              setWishlistItems([]);
              setSelectedWishlistId(null);
            }
            setRefreshKey((prevKey) => prevKey + 1);
          })
          .catch((error) => {
            setDbStatus("error");
            Swal.fire({
              title: "Error!",
              text: `Failed to delete wishlist: ${error.message}`,
              icon: "error",
              customClass: {
                popup: "animate__animated animate__shakeX",
              },
            });
          });
      }
    });
  };

  const showItemDetailsModal = (item) => {
    Swal.fire({
      title: item.name,
      html: `
        <div class="text-left">
          <p><strong>Category:</strong> ${item.category || "Not specified"}</p>
          <p><strong>Price:</strong> ${
            item.price ? `$${item.price.toFixed(2)}` : "Not specified"
          }</p>
          <p><strong>Priority:</strong> ${
            item.priority || "Not specified"
          }/5</p>
          ${
            item.description
              ? `<p><strong>Description:</strong> ${item.description}</p>`
              : ""
          }
          ${
            item.addedAt
              ? `<p><strong>Added on:</strong> ${new Date(
                  item.addedAt
                ).toLocaleDateString()}</p>`
              : ""
          }
        </div>
      `,
      imageUrl: item.imageUrl || "https://via.placeholder.com/150",
      imageWidth: 200,
      imageAlt: item.name,
      showCancelButton: !!item.link,
      confirmButtonText: item.link ? "Visit Website" : "OK",
      cancelButtonText: "Close",
      customClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed && item.link) {
        window.open(item.link, "_blank");
      }
    });
  };

  const deleteWishlistItem = (itemId, itemName) => {
    Swal.fire({
      title: `Delete "${itemName}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setDbStatus("writing");
        const itemRef = ref(
          database,
          `wishlists/${activeWishlist.id}/items/${itemId}`
        );

        remove(itemRef)
          .then(() => {
            setDbStatus("success");
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              // icon: "success",
              customClass: {
                popup: "animate__animated animate__tada",
              },
            });
            fetchWishlistItems(activeWishlist.id);
          })
          .catch((error) => {
            setDbStatus("error");
            Swal.fire({
              title: "Error!",
              text: `Failed to delete item: ${error.message}`,
              icon: "error",
              customClass: {
                popup: "animate__animated animate__shakeX",
              },
            });
          });
      }
    });
  };

  const showAddItemModal = () => {
    if (!activeWishlist) {
      Swal.fire({
        title: "No Wishlist Selected",
        text: "Please select a wishlist first",
        icon: "warning",
        customClass: {
          popup: "animate__animated animate__headShake",
        },
      });
      return;
    }

    Swal.fire({
      title: `Add Item to "${activeWishlist.title}"`,
      html: `
        <div class="mb-3">
          <input type="text" class="form-control" id="swal-input1" placeholder="Item Name" required>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="swal-input2" placeholder="Image URL">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="swal-input3" placeholder="Website URL (optional)">
        </div>
        <div class="mb-3">
          <select class="form-select" id="swal-input4">
            <option value="Other">Other</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div class="mb-3">
          <input type="number" class="form-control" id="swal-input5" placeholder="Price (e.g. 99.99)" step="0.01">
        </div>
        <div class="mb-3">
          <textarea class="form-control" id="swal-input6" placeholder="Description (optional)" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <select class="form-select" id="swal-input7">
            <option value="3">Medium Priority</option>
            <option value="1">Low Priority</option>
            <option value="5">High Priority</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const priceInput = document.getElementById("swal-input5");
        const priceValue = parseFloat(priceInput.value);

        if (priceInput.value && (isNaN(priceValue) || priceValue < 0)) {
          Swal.showValidationMessage("Please enter a valid positive price");
          return false;
        }
        return {
          name: document.getElementById("swal-input1").value,
          imageUrl: document.getElementById("swal-input2").value,
          link: document.getElementById("swal-input3").value,
          category: document.getElementById("swal-input4").value,
          price: document.getElementById("swal-input5").value,
          description: document.getElementById("swal-input6").value,
          priority: document.getElementById("swal-input7").value,
        };
      },
      customClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, imageUrl, link, category, price, description, priority } =
          result.value;

        if (!name) {
          Swal.fire({
            title: "Oops!",
            text: "Item name is required",
            icon: "warning",
            customClass: {
              popup: "animate__animated animate__headShake",
            },
          });
          return;
        }

        setDbStatus("writing");
        const newItem = {
          name,
          imageUrl: imageUrl || "",
          link: link || "",
          category: category || "Other",
          price: price ? parseFloat(price) : null,
          description: description || "",
          priority: parseInt(priority) || 3,
          addedAt: new Date().toISOString(),
        };

        const itemsRef = ref(database, `wishlists/${activeWishlist.id}/items`);
        const newItemRef = push(itemsRef);

        set(newItemRef, newItem)
          .then(() => {
            setDbStatus("success");
            Swal.fire({
              title: "Success!",
              html: `<p class="animate__animated animate__tada"><FaGift /> ${name} added to ${activeWishlist.title}</p>`,
              icon: "success",
              customClass: {
                popup: "animate__animated animate__fadeIn",
              },
            });
            fetchWishlistItems(activeWishlist.id);
          })
          .catch((error) => {
            setDbStatus("error");
            Swal.fire({
              title: "Error!",
              text: `Failed to add item: ${error.message}`,
              icon: "error",
              customClass: {
                popup: "animate__animated animate__shakeX",
              },
            });
          });
      }
    });
  };

  const renderDbStatusAlert = () => {
    switch (dbStatus) {
      case "disconnected":
        return (
          <Alert variant="danger" className="animate__animated animate__fadeIn">
            Database disconnected! Check your connection.
          </Alert>
        );
      case "error":
        return (
          <Alert variant="danger" className="animate__animated animate__shakeX">
            Database operation failed!
          </Alert>
        );
      case "writing":
        return (
          <Alert variant="info" className="animate__animated animate__fadeIn">
            <Spinner animation="border" size="sm" className="mr-2" /> Saving to
            database...
          </Alert>
        );
      case "success":
        return (
          <Alert
            variant="success"
            className="animate__animated animate__fadeIn"
          >
            Database updated successfully!
          </Alert>
        );
      default:
        return null;
    }
  };

  if (!currentUser) {
    return (
      <Container className="my-5 text-center animate__animated animate__fadeIn">
        <h1>
          <FaShoppingBasket /> My Wishlist
        </h1>
        <Alert variant="info" className="mt-4">
          Please log in to view and manage your wishlists
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4 animate__animated animate__fadeIn">
      <Row>
        {/* Wishlist Selector Column */}
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            {/* <Card.Header className="bg-primary text-white">
              <h2 className="mb-0"><FaListUl /> My Wishlists</h2>
            </Card.Header> */}
            <Card.Body className="d-flex flex-column">
              <Button
                variant="dark"
                className="mb-3 align-self-start"
                onClick={() => setShowCreateModal(true)}
              >
                <FaPlus /> Create New
              </Button>

              {wishlists.length === 0 ? (
                <Alert variant="info" className="mt-3">
                  You haven't created any wishlists yet
                </Alert>
              ) : (
                <ListGroup
                  className="overflow-auto"
                  style={{ maxHeight: "500px" }}
                >
                  {wishlists.map((wishlist) => (
                    <ListGroup.Item
                      key={wishlist.id}
                      action
                      active={activeWishlist?.id === wishlist.id}
                      onClick={() => selectWishlist(wishlist)}
                      className="d-flex justify-content-between align-items-center animate__animated animate__fadeIn"
                    >
                      <div>
                        <h5 className="mb-1">{wishlist.title}</h5>
                        <small className="text-muted">
                          {wishlist.description || "No description"}
                        </small>
                        <div>
                          <Badge
                            variant={
                              wishlist.privacy === "public"
                                ? "success"
                                : "secondary"
                            }
                            className="mr-2"
                          >
                            {wishlist.privacy}
                          </Badge>
                          <small>
                            {new Date(wishlist.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="mr-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareWishlist(wishlist.id);
                          }}
                        >
                          <FaShare />
                        </Button>
                        <span> </span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteWishlist(wishlist.id);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Wishlist Items Column */}
        <Col md={8}>
          {!activeWishlist ? (
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <h2 className="text-muted mb-4">No wishlist selected</h2>
                <p>
                  Please select a wishlist from the left or create a new one
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowCreateModal(true)}
                  className="mt-3"
                >
                  <FaPlus /> Create New Wishlist
                </Button>
              </Card.Body>
            </Card>
          ) : loading ? (
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center d-flex flex-column justify-content-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading your wishlist items...</p>
              </Card.Body>
            </Card>
          ) : (
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">{activeWishlist.title}</h2>
                  <Button variant="light" size="sm" onClick={showAddItemModal}>
                    <FaPlus /> Add Item
                  </Button>
                </div>
                {activeWishlist.description && (
                  <p className="mb-0 mt-1">{activeWishlist.description}</p>
                )}
              </Card.Header>
              <Card.Body
                className="overflow-auto"
                style={{ maxHeight: "600px" }}
              >
                {wishlistItems.length === 0 ? (
                  <Alert variant="info" className="text-center">
                    You haven't added any items to this wishlist yet
                  </Alert>
                ) : (
                  <Row>
                    {wishlistItems.map((item) => (
                      <Col
                        md={6}
                        lg={4}
                        key={item.id}
                        className="mb-4 animate__animated animate__fadeIn"
                      >
                        <Card className="h-100">
                          <div
                            className="position-relative"
                            style={{
                              cursor: item.link ? "pointer" : "default",
                            }}
                            onClick={() =>
                              item.link
                                ? window.open(item.link, "_blank")
                                : null
                            }
                          >
                            <Card.Img
                              variant="top"
                              src={
                                item.imageUrl ||
                                "https://via.placeholder.com/150"
                              }
                              alt={item.name}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            {item.price && (
                              <Badge
                                pill
                                variant="success"
                                className="position-absolute"
                                style={{ top: "10px", right: "10px" }}
                              >
                                ${item.price.toFixed(2)}
                              </Badge>
                            )}
                          </div>
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {item.category}
                            </Card.Subtitle>
                            {item.description && (
                              <Card.Text className="text-truncate">
                                {item.description}
                              </Card.Text>
                            )}
                            <div className="d-flex justify-content-between align-items-center">
                              <Badge variant="info">
                                Priority: {item.priority}/5
                              </Badge>
                              <div>
                                
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="mr-1"
                                  onClick={() => showItemDetailsModal(item)}
                                >
                                  <FaEye />
                                </Button>
                                <span> </span>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() =>
                                    deleteWishlistItem(item.id, item.name)
                                  }
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
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Create Wishlist Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaPlus /> Create New Wishlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="wishlistTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter wishlist title"
                value={newWishlistTitle}
                onChange={(e) => setNewWishlistTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="wishlistDescription">
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newWishlistDesc}
                onChange={(e) => setNewWishlistDesc(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId="wishlistPrivacy">
              <Form.Label>Privacy Setting</Form.Label>
              <Form.Control
                as="select"
                value={newWishlistPrivacy}
                onChange={(e) => setNewWishlistPrivacy(e.target.value)}
              >
                <option value="private">Private (only you can see)</option>
                <option value="public">
                  Public (anyone with link can see)
                </option>
              </Form.Control>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateWishlist}>
            Create Wishlist
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};




export default Createwishlist;
