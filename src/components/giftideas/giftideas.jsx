import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import "animate.css";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaGift, 
  FaHeart, 
  FaEye,
  FaSpinner,
  FaExternalLinkAlt,
  FaTag,
  FaStar
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const GiftIdeas = () => {
  const [gifts, setGifts] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = () => {
    setLoading(true);
    axios.get("http://localhost:4000/gifts")
      .then(res => {
        setGifts(res.data);
        setAllGifts(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        setLoading(false);
        
        // Success notification
        Swal.fire({
          title: "Gift Ideas Loaded!",
          text: `${res.data.length} gift ideas found`,
          icon: "success",
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
        
        // Error notification
        Swal.fire({
          title: "Error!",
          text: "Could not load gift ideas. Please try again later.",
          icon: "error",
          showClass: {
            popup: 'animate__animated animate__shakeX'
          }
        });
      });
  };

  const addToWishlist = (gift) => {
    // Create wishlist item from gift (without client-side ID)
    const wishlistItem = {
      // Remove client-side ID generation
      name: gift.name,
      imageUrl: gift.imageUrl,
      websiteLink: gift.websiteLink || "", // Changed from productUrl to websiteLink
      category: gift.category || "",
      price: gift.price ? parseFloat(gift.price) : null,
      brand: gift.brand || "",
      description: gift.description || "",
      dateAdded: new Date().toISOString()
    };
    
    // Send to wishlist API
    axios.post("http://localhost:4000/your_wishlist", wishlistItem)
      .then(response => {
        // Use server-returned data with server-generated ID
        console.log("Server response with ID:", response.data);
        
        Swal.fire({
          title: "Added to Wishlist!",
          text: `${gift.name} has been added to your wishlist`,
          icon: "success",
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          }
        });
      })
      .catch(error => {
        console.error("Error adding to wishlist:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not add to wishlist. Please try again.",
          icon: "error",
          showClass: {
            popup: 'animate__animated animate__shakeX'
          }
        });
      });
  };

  // Fixed method to handle external link clicks
  const visitGiftWebsite = (e, url) => {
    // Prevent the default event and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (url) {
      window.open(url, '_blank');
    } else {
      Swal.fire({
        title: 'No Link Available',
        text: 'This item does not have a website link.',
        icon: 'info'
      });
    }
  };

  const viewGiftDetails = (gift) => {
    Swal.fire({
      title: gift.name,
      html: `
        <div class="mb-3">
          ${gift.brand ? `<div class="mb-3"><strong>Brand:</strong> ${gift.brand}</div>` : ''}
          ${gift.category ? `<div class="mb-3"><strong>Category:</strong> ${gift.category}</div>` : ''}
          ${gift.price ? `<div class="mb-3"><strong>Price:</strong> $${parseFloat(gift.price).toFixed(2)}</div>` : ''}
          ${gift.rating ? `<div class="mb-3"><strong>Rating:</strong> ${gift.rating} / 5</div>` : ''}
          ${gift.description ? `<div class="mb-3"><strong>Description:</strong><br>${gift.description}</div>` : ''}
        </div>
      `,
      imageUrl: gift.imageUrl || 'https://via.placeholder.com/150',
      imageWidth: 300,
      imageHeight: 300,
      showCancelButton: true,
      confirmButtonText: gift.websiteLink ? 'Visit Website' : 'Close', // Changed from productUrl to websiteLink
      cancelButtonText: 'Add to Wishlist',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    }).then((result) => {
      if (result.isConfirmed && gift.websiteLink) { // Changed from productUrl to websiteLink
        // Redirect to the item's website
        window.open(gift.websiteLink, '_blank'); // Changed from productUrl to websiteLink
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Add to wishlist
        addToWishlist(gift);
      }
    });
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterGifts(term, selectedCategory);
  };
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterGifts(searchTerm, category);
  };

  // Apply filters
  const filterGifts = (term, category) => {
    let filtered = [...allGifts];
    
    // Filter by search term
    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(gift => 
        gift.name.toLowerCase().includes(lowerTerm) || 
        (gift.brand && gift.brand.toLowerCase().includes(lowerTerm)) ||
        (gift.description && gift.description.toLowerCase().includes(lowerTerm))
      );
    }
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(gift => gift.category === category);
    }
    
    setGifts(filtered);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setGifts(allGifts);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="animate__animated animate__pulse animate__infinite">
          <FaSpinner className="fa-spin" size={30} />
          <h3 className="mt-3">Loading gift ideas...</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 animate__animated animate__fadeIn">
        <FaGift className="text-primary me-2" /> Gift Ideas
      </h1>
      
      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search gifts..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setSearchTerm("");
                  filterGifts("", selectedCategory);
                }}
              >
                <FaTimes />
              </Button>
            )}
          </InputGroup>
        </Col>
        
        <Col xs={12} md={4} className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FaFilter />
            </InputGroup.Text>
            <Form.Select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        
        <Col xs={12} md={2} className="mb-3">
          <Button 
            variant="outline-secondary" 
            onClick={clearFilters}
            className="w-100"
            disabled={!searchTerm && !selectedCategory}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
      
      {gifts.length === 0 && !loading ? (
        <div className="text-center mt-5 animate__animated animate__fadeIn">
          <FaGift size={50} className="text-muted mb-3" />
          <h3>No gift ideas match your search</h3>
          <p className="text-muted">Try different search terms or clear filters</p>
          <Button 
            variant="primary" 
            className="mt-3"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {gifts.map((gift, index) => (
            <Col key={gift.id || index}>
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
                {/* Main card body that opens details on click */}
                <div onClick={() => viewGiftDetails(gift)} style={{ cursor: 'pointer' }}>
                  <div style={{ 
                    position: 'relative', 
                    height: '200px',
                    overflow: 'hidden' 
                  }}>
                    <Card.Img 
                      variant="top" 
                      src={gift.imageUrl || "https://via.placeholder.com/150"}
                      className="animate__animated animate__zoomIn"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    
                    {/* Visit website button - fixed to use websiteLink */}
                    {gift.websiteLink && (
                      <div
                        className="position-absolute"
                        style={{
                          top: '10px',
                          right: '10px',
                          zIndex: 10
                        }}
                        onClick={(e) => visitGiftWebsite(e, gift.websiteLink)}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          style={{
                            borderRadius: '50%',
                            padding: '8px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                          }}
                        >
                          <FaExternalLinkAlt className="text-primary" />
                        </Button>
                      </div>
                    )}
                    
                    {gift.price && (
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
                        <FaTag className="me-1" /> ${parseFloat(gift.price).toFixed(2)}
                      </div>
                    )}
                    
                    {/* Display rating if available */}
                    {gift.rating && (
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}
                      >
                        <FaStar className="me-1 text-warning" /> {gift.rating}
                      </div>
                    )}
                  </div>
                  
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center">
                      <FaGift className="text-primary me-2" /> 
                      {gift.name}
                    </Card.Title>
                    <div className="mb-2">
                      {gift.brand && (
                        <div className="text-muted small mb-1">
                          Brand: {gift.brand}
                          
                        </div>
                      )}
                      {gift.category && (
                        <div className="d-flex align-items-center text-muted small">
                          <MdCategory className="me-1" />
                          {gift.category}
                        </div>
                      )}
                    </div>
                    {gift.description && (
                      <Card.Text className="small text-truncate">
                        {gift.description}
                      </Card.Text>
                    )}
                    <div className="d-flex justify-content-between mt-3">
                      <Button 
                        variant="primary" 
                        className="animate__animated animate__pulse animate__delay-1s"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewGiftDetails(gift);
                        }}
                      >
                        <FaEye className="me-2" /> Details
                      </Button>
                      
                      {/* Modified external link button to use websiteLink */}
                      {gift.websiteLink ? (
                        <Button 
                          variant="outline-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            visitGiftWebsite(e, gift.websiteLink);
                          }}
                        >
                          <FaExternalLinkAlt className="me-2" /> Visit More
                        </Button>
                      ) : (
                        <Button 
                          variant="outline-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToWishlist(gift);
                          }}
                        >
                          <FaHeart className="me-2" /> Add to Wishlist
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GiftIdeas;