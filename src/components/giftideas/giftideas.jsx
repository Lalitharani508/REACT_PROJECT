import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import "animate.css";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const GiftIdeas = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = () => {
    setLoading(true);
    axios.get("http://localhost:4000/gifts")
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setAllData(res.data);
        setLoading(false);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCategories);
        
        // Welcome notification with animation
        Swal.fire({
          title: "Gift Ideas Loaded!",
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

  const addToWishlist = (giftitem) => {
    axios.post("http://localhost:4000/your_wishlist", giftitem)
      .then(() => {
        Swal.fire({
          title: "Added to Wishlist!",
          text: `${giftitem.name} has been added to your wishlist`,
          icon: "success",
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          },
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          position: 'top-end'
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Could not add to wishlist. Please try again.",
          icon: "error",
          toast: true,
          position: 'top-end'
        });
      });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterGifts(e.target.value, searchCategory);
  };
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    filterGifts(searchTerm, e.target.value);
  };
  
  // Filter gifts based on search term and category
  const filterGifts = (term, category) => {
    let filteredResults = [...allData];
    
    // Filter by search term
    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      filteredResults = filteredResults.filter(gift => 
        gift.name.toLowerCase().includes(lowerCaseTerm) || 
        (gift.brand && gift.brand.toLowerCase().includes(lowerCaseTerm))
      );
    }
    
    // Filter by category
    if (category) {
      filteredResults = filteredResults.filter(gift => 
        gift.category === category
      );
    }
    
    setData(filteredResults);
    
    // Show animation for filtered results
    if (filteredResults.length > 0) {
      const cards = document.querySelectorAll('.gift-card');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.remove('animate__fadeIn');
        void card.offsetWidth; // Trigger reflow
        card.classList.add('animate__fadeIn');
      });
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSearchCategory("");
    setData(allData);
    
    Swal.fire({
      title: "Filters Cleared",
      icon: "info",
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      }
    });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="animate__animated animate__pulse animate__infinite">
          <h2>Loading awesome gift ideas for you...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4 animate__animated animate__fadeIn">
        Gift Ideas For You
      </h1>
      
      {/* Search and Filter Section */}
      <div className="animate__animated animate__fadeIn mb-4">
        <Row className="g-3 align-items-end">
          <Col xs={12} md={5}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search by name or brand..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="animate__animated animate__fadeIn"
              />
              {searchTerm && (
                <Button 
                  variant="outline-secondary" 
                  onClick={() => {
                    setSearchTerm("");
                    filterGifts("", searchCategory);
                  }}
                >
                  <FaTimes />
                </Button>
              )}
            </InputGroup>
          </Col>
          
          <Col xs={12} md={5}>
            <InputGroup>
              <InputGroup.Text>
                <FaFilter />
              </InputGroup.Text>
              <Form.Select
                value={searchCategory}
                onChange={handleCategoryChange}
                className="animate__animated animate__fadeIn"
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
          
          <Col xs={12} md={2}>
            <div className="d-grid gap-2">
              <Button 
                variant="outline-danger" 
                onClick={clearFilters}
                className="animate__animated animate__fadeIn"
                disabled={!searchTerm && !searchCategory}
              >
                Clear Filters
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      
      <Button 
        variant="outline-secondary" 
        className="mb-4 animate__animated animate__fadeInLeft"
        onClick={fetchGifts}
      >
        Refresh Gift Ideas
      </Button>
      
      {/* Results counter */}
      <p className="text-muted mb-3 animate__animated animate__fadeIn">
        Showing {data.length} of {allData.length} gifts
        {(searchTerm || searchCategory) && " (filtered)"}
      </p>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {data.map((gift, index) => (
          <Col key={gift.id || index}>
            <Card 
              className="h-100 animate__animated animate__fadeIn gift-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card.Img 
                variant="top" 
                src={gift.imageUrl} 
                className="animate__animated animate__zoomIn"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="animate__animated animate__fadeIn">{gift.name}</Card.Title>
                <Card.Text className="text-muted animate__animated animate__fadeIn">
                  {gift.brand}
                </Card.Text>
                {gift.category && (
                  <Card.Text className="text-muted animate__animated animate__fadeIn">
                    <small>Category: {gift.category}</small>
                  </Card.Text>
                )}
                <Card.Text className="fw-bold animate__animated animate__fadeIn">
                  ${gift.price}
                </Card.Text>
                <Button 
                  variant="primary" 
                  className="animate__animated animate__pulse animate__delay-1s"
                  onClick={() => addToWishlist(gift)}
                >
                  Add To Wishlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {data.length === 0 && (
        <div className="text-center mt-5 animate__animated animate__fadeIn">
          <h3>No gift ideas found matching your search</h3>
          <p className="text-muted">Try different search terms or clear filters</p>
          <Button 
            variant="primary" 
            className="mt-3 animate__animated animate__heartBeat animate__delay-1s"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </Container>
  );
};

export default GiftIdeas;