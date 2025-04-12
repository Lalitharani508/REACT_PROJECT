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
  FaSpinner 
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
        console.log(res.data);
        setWishlist(res.data);
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
      title: 'Create New Wishlist',
      html: `
        <input id="wishlistName" class="swal2-input" placeholder="Wishlist Name">
        <select id="wishlistCategory" class="swal2-input">
          <option value="">Select Category</option>
          <option value="Birthday">Birthday</option>
          <option value="Christmas">Christmas</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Wedding">Wedding</option>
          <option value="Other">Other</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      },
      preConfirm: () => {
        const name = document.getElementById('wishlistName').value;
        const category = document.getElementById('wishlistCategory').value;
        
        if (!name) {
          Swal.showValidationMessage('Please enter a wishlist name');
          return false;
        }
        
        // Here you would typically make an API call to create the wishlist
        // For demo, we'll just add it to the state
        const newWishlist = {
          id: Date.now(),
          name,
          category,
          imageUrl: 'https://via.placeholder.com/150'
        };
        
        setWishlist([...wishlist, newWishlist]);
        
        return true;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Your new wishlist has been created',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          }
        });
      }
    });
  };

  const viewGift = (gift) => {
    Swal.fire({
      title: gift.name,
      text: `Category: ${gift.category}`,
      imageUrl: gift.imageUrl || 'https://via.placeholder.com/150',
      imageWidth: 200,
      imageHeight: 200,
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
  };

  // FIXED DELETE FUNCTION
  const deleteWishlist = (item) => {
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

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="animate__animated animate__pulse animate__infinite">
          <FaSpinner className="fa-spin" size={30} />
          <h3 className="mt-3">Loading your wishlists...</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 animate__animated animate__fadeIn">
        <FaHeart className="text-danger me-2" /> My Wishlists
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
            <h4>Create a new wishlist</h4>
          </div>
        </Col>
      </Row>
      
      {wishlist.length === 0 && !loading ? (
        <div className="text-center mt-5 animate__animated animate__fadeIn">
          <FaGift size={50} className="text-muted mb-3" />
          <h3>You haven't created any wishlists yet</h3>
          <p className="text-muted">Click the box above to create your first wishlist!</p>
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
                <Card.Img 
                  variant="top" 
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  className="animate__animated animate__zoomIn"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaGift className="text-primary me-2" /> 
                    {item.name}
                  </Card.Title>
                  <Card.Text className="d-flex align-items-center text-muted">
                    <MdCategory className="me-2" />
                    {item.category}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <Button 
                      variant="primary" 
                      className="animate__animated animate__pulse animate__delay-1s"
                      onClick={() => viewGift(item)}
                    >
                      <FaEye className="me-2" /> View
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      onClick={() => deleteWishlist(item)}
                    >
                      <FaTrash />
                    </Button>
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