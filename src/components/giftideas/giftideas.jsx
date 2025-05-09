import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
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
  FaStar,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
// Import Firebase functionality
import { getDatabase, ref, push, get, set, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "../../firebaseconfig"; // Adjust path as needed

const GiftIdeas = () => {
  // Local data - hardcoded gifts (keeping your existing data here)
  const localGiftData = [
    {
      id: "1",
      name: "Silk Evening Gown",
      category: "dresses",
      price: 1899.99,
      brand: "Valentino",
      imageUrl:
        "https://i.pinimg.com/736x/05/71/94/057194a7c7018a04acea481ef9c31a20.jpg",
      websiteLink: "https://www.valentino.com",
      rating: 4.8,
      description:
        "Elegant floor-length silk evening gown with delicate embroidery details, perfect for formal occasions and black-tie events.",
    },
    {
      id: "2",
      name: "Leather Watch Box",
      category: "accessories",
      price: 12999,
      brand: "Fossil",
      imageUrl:
        "https://i.pinimg.com/736x/22/27/be/2227be88f1c4f1badc8d14e8d702379a.jpg",
      websiteLink: "https://www.fossil.com",
      rating: 4.5,
      description:
        "Handcrafted genuine leather watch storage case with soft velvet interior, holds up to 10 watches with additional compartments for accessories.",
    },
    {
      id: "3",
      name: "Premium Chocolate Gift Set",
      category: "food",
      price: 6499,
      brand: "Godiva",
      imageUrl:
        "https://i.pinimg.com/736x/cb/3b/84/cb3b8430965b0252da2021259f7e4e96.jpg",
      websiteLink: "https://www.godiva.com",
      rating: 4.7,
      description:
        "Luxurious assortment of handcrafted Belgian chocolates including truffles, pralines, and ganaches in an elegant gift box.",
    },
    {
      id: "4",
      name: "Wireless Headphones",
      category: "electronics",
      price: 32999,
      brand: "Bose",
      imageUrl:
        "https://i.pinimg.com/736x/6e/58/b5/6e58b528f8b8a6fd9e1e9f8287847ff0.jpg",
      websiteLink: "https://www.bose.com",
      rating: 4.6,
      description:
        "Premium noise-canceling wireless headphones with up to 20 hours of battery life, comfortable over-ear design and exceptional sound quality.",
    },
    {
      id: "5",
      name: "Scented Candle Collection",
      category: "home",
      price: 8999,
      brand: "Yankee Candle",
      imageUrl:
        "https://i.pinimg.com/736x/89/8b/96/898b96022c0faed9d7a8ca9e733a563d.jpg",
      websiteLink: "https://www.yankeecandle.com",
      rating: 4.4,
      description:
        "Set of six signature scented candles in seasonal fragrances, made with premium-grade paraffin wax and each burning for up to 150 hours.",
    },
    {
      id: "6",
      name: "Leather Wallet",
      category: "accessories",
      price: 14499,
      brand: "Coach",
      imageUrl:
        "https://i.pinimg.com/736x/d5/7f/15/d57f15b00f7aff1077b67a1cba8f6719.jpg",
      websiteLink: "https://www.coach.com",
      rating: 4.5,
      description:
        "Classic bifold leather wallet with signature Coach pattern, featuring multiple card slots, bill compartments, and RFID protection technology.",
    },
    {
      id: "7",
      name: "Fitness Smartwatch",
      category: "electronics",
      price: 27999,
      brand: "Garmin",
      imageUrl:
        "https://i.pinimg.com/736x/11/b5/37/11b537daf694fd95e38582d412a08c94.jpg",
      websiteLink: "https://www.garmin.com",
      rating: 4.7,
      description:
        "Advanced GPS fitness smartwatch with heart rate monitoring, sleep tracking, built-in sports apps, and up to 7 days of battery life.",
    },
    {
      id: "8",
      name: "Luxury Perfume",
      category: "beauty",
      price: 19999,
      brand: "Chanel",
      imageUrl:
        "https://i.pinimg.com/736x/23/a7/b4/23a7b431ded57ab7b94ed4f6dcab3f81.jpg",
      websiteLink: "https://www.chanel.com",
      rating: 4.9,
      description:
        "Iconic signature fragrance with sophisticated blend of floral and woody notes in an elegant glass bottle, perfect for special occasions.",
    },
    {
      id: "9",
      name: "Crystal Wine Glasses Set",
      category: "home",
      price: 24999,
      brand: "Waterford",
      imageUrl:
        "https://i.pinimg.com/736x/c3/9e/27/c39e2773c5633a418433bf19a924648e.jpg",
      websiteLink: "https://www.waterford.com",
      rating: 4.8,
      description:
        "Set of six hand-crafted crystal wine glasses with exquisite cut design, perfect for enhancing the tasting experience of fine wines.",
    },
    {
      id: "10",
      name: "Cashmere Scarf",
      category: "clothing",
      price: 21999,
      brand: "Burberry",
      imageUrl:
        "https://i.pinimg.com/736x/23/eb/e8/23ebe804b1dc2ca6244295fe6644b906.jpg",
      websiteLink: "https://www.burberry.com",
      rating: 4.6,
      description:
        "Luxuriously soft 100% cashmere scarf featuring the iconic Burberry check pattern, crafted in Scotland with meticulous attention to detail.",
    },
    {
      id: "11",
      name: "Professional Chef Knife",
      category: "kitchen",
      price: 28499,
      brand: "Wüsthof",
      imageUrl:
        "https://i.pinimg.com/736x/6d/ac/8f/6dac8f68d6a8d071b156ce545642596e.jpg",
      websiteLink: "https://www.wusthof.com",
      rating: 4.8,
      description:
        "Precision-forged 8-inch chef's knife with high-carbon stainless steel blade, full tang, and ergonomic handle for perfect balance and control.",
    },
    {
      id: "12",
      name: "Indoor Plant Collection",
      category: "home",
      price: 9499,
      brand: "The Sill",
      imageUrl:
        "https://i.pinimg.com/736x/0f/ce/a0/0fcea03e6d74dee1429e5d1a096392a9.jpg",
      websiteLink: "https://www.thesill.com",
      rating: 4.5,
      description:
        "Collection of three low-maintenance indoor plants in stylish ceramic planters, perfect for purifying air and adding natural beauty to any space.",
    },
    {
      id: "13",
      name: "Luxury Skincare Set",
      category: "beauty",
      price: 34999,
      brand: "La Mer",
      imageUrl:
        "https://i.pinimg.com/736x/d6/db/de/d6dbde131ff8120b742c16520df0dd02.jpg",
      websiteLink: "https://www.lamer.com",
      rating: 4.9,
      description:
        "Premium skincare collection featuring signature moisturizing cream, renewal oil, and eye concentrate with patented sea kelp formulation.",
    },
    {
      id: "14",
      name: "Espresso Machine",
      category: "kitchen",
      price: 65999,
      brand: "Breville",
      imageUrl:
        "https://i.pinimg.com/736x/94/08/9e/94089e6a42ae6b5fa69171d5812456ed.jpg",
      websiteLink: "https://www.breville.com",
      rating: 4.7,
      description:
        "Professional-grade home espresso machine with 15-bar Italian pump, precise temperature control, and integrated grinder for cafe-quality coffee.",
    },
    {
      id: "15",
      name: "Premium Golf Clubs Set",
      category: "sports",
      price: 1999,
      brand: "Callaway",
      imageUrl:
        "https://i.pinimg.com/736x/d0/4b/53/d04b53a085bf89d7f742de979f2ca51e.jpg",
      websiteLink: "https://www.callawaygolf.com",
      rating: 4.8,
      description:
        "Complete set of premium golf clubs including driver, fairway woods, hybrids, irons, wedges, and putter with lightweight stand bag and headcovers.",
    },
    {
      id: "16",
      name: "Designer Sunglasses",
      category: "accessories",
      price: 29999,
      brand: "Ray-Ban",
      imageUrl:
        "https://i.pinimg.com/736x/f4/ac/3e/f4ac3e6a29fc272de96c873ebad0df0b.jpg",
      websiteLink: "https://www.ray-ban.com",
      rating: 4.6,
      description:
        "Iconic aviator sunglasses with polarized lenses, gold-tone frames, and 100% UV protection, delivering timeless style and exceptional clarity.",
    },
    {
      id: "17",
      name: "Wine Subscription Box",
      category: "food",
      price: 15999,
      brand: "Winc",
      imageUrl:
        "https://i.pinimg.com/736x/64/67/c8/6467c80a84da72ec5855c31f233913c5.jpg",
      websiteLink: "https://www.winc.com",
      rating: 4.5,
      description:
        "Personalized monthly wine subscription delivering four bottles of premium, small-batch wines selected based on taste preferences and profiles.",
    },
    {
      id: "18",
      name: "Modern Art Print",
      category: "home",
      price: 22999,
      brand: "Society6",
      imageUrl:
        "https://i.pinimg.com/736x/07/b3/1e/07b31e0118ec3122a853e107a623f246.jpg",
      websiteLink: "https://www.society6.com",
      rating: 4.4,
      description:
        "Limited edition gallery-quality art print on premium archival paper, created by independent artists with contemporary abstract design.",
    },
    {
      id: "19",
      name: "Premium Yoga Mat",
      category: "fitness",
      price: 11999,
      brand: "Lululemon",
      imageUrl:
        "https://i.pinimg.com/736x/9d/ef/0d/9def0d9a0c8384b0cd2a1f69f881d4ae.jpg",
      websiteLink: "https://www.lululemon.com",
      rating: 4.7,
      description:
        "High-performance 5mm thick yoga mat with natural rubber base, antimicrobial additive, and optimal cushioning and grip for all types of yoga.",
    },
    {
      id: "20",
      name: "E-Reader",
      category: "electronics",
      price: 18999,
      brand: "Kindle",
      imageUrl:
        "https://i.pinimg.com/736x/2a/7c/c4/2a7cc424fd6826e3c7420fc5d7128c53.jpg",
      websiteLink: "https://www.amazon.com/kindle",
      rating: 4.6,
      description:
        "Lightweight e-reader with 6-inch glare-free display, adjustable front light, weeks of battery life, and storage for thousands of books.",
    },
    {
      id: "21",
      name: "Luxury Bath Robe",
      category: "clothing",
      price: 16499,
      brand: "Parachute",
      imageUrl:
        "https://i.pinimg.com/736x/2a/4a/8c/2a4a8c3a1ab8ec0520d2a4f6ab73ccbe.jpg",
      websiteLink: "https://www.parachutehome.com",
      rating: 4.7,
      description:
        "Plush Turkish cotton bathrobe with shawl collar, two front pockets, and tie belt, offering hotel-quality luxury and exceptional absorbency.",
    },
    {
      id: "22",
      name: "Smart Home Speaker",
      category: "electronics",
      price: 34999,
      brand: "Sonos",
      imageUrl:
        "https://i.pinimg.com/736x/48/df/95/48df951fedbe7308d7b2ead9bb6373bd.jpg",
      websiteLink: "https://www.sonos.com",
      rating: 4.8,
      description:
        "Premium wireless smart speaker with voice control, multi-room capability, and rich, room-filling sound that adapts to your space acoustics.",
    },
    {
      id: "23",
      name: "Leather Crossbody Bag",
      category: "accessories",
      price: 28999,
      brand: "Kate Spade",
      imageUrl:
        "https://i.pinimg.com/736x/61/b4/63/61b46375c16fbf7799d1ebb196484cc3.jpg",
      websiteLink: "https://www.katespade.com",
      rating: 4.6,
      description:
        "Stylish pebbled leather crossbody bag with signature hardware, adjustable strap, zippered closure, and multiple interior compartments.",
    },
    {
      id: "24",
      name: "Gourmet Coffee Sampler",
      category: "food",
      price: 7999,
      brand: "Blue Bottle",
      imageUrl:
        "https://i.pinimg.com/736x/f2/9f/68/f29f68a32d169a64d42d5c90f1a3a7fb.jpg",
      websiteLink: "https://www.bluebottlecoffee.com",
      rating: 4.7,
      description:
        "Curated selection of single-origin and specialty coffee beans from world-renowned growing regions, freshly roasted and ready to brew.",
    },
    {
      id: "25",
      name: "Personalized Jewelry Box",
      category: "accessories",
      price: 14999,
      brand: "Things Remembered",
      imageUrl:
        "https://i.pinimg.com/736x/37/9d/09/379d09aefe130434187d04ca039a8958.jpg",
      websiteLink: "https://www.thingsremembered.com",
      rating: 4.5,
      description:
        "Elegant wooden jewelry box with custom engraving, velvet-lined compartments, ring rolls, and a built-in mirror for organizing treasured pieces.",
    },
    {
      id: "26",
      name: "Smart Doorbell",
      category: "home",
      price: 24999,
      brand: "Ring",
      imageUrl:
        "https://i.pinimg.com/736x/4b/13/ad/4b13ad9a1b21e32c651c85290ac1b269.jpg",
      websiteLink: "https://www.ring.com",
      rating: 4.5,
      description:
        "Wi-Fi enabled video doorbell with HD camera, two-way talk, motion detection, and smartphone alerts for enhanced home security.",
    },
    {
      id: "27",
      name: "Designer Watch",
      category: "accessories",
      price: 4999,
      brand: "Movado",
      imageUrl:
        "https://i.pinimg.com/736x/b5/52/0b/b5520b955199dcd4713e44470759d78a.jpg",
      websiteLink: "https://www.movado.com",
      rating: 4.8,
      description:
        "Sophisticated timepiece with iconic minimalist design, Swiss quartz movement, sapphire crystal, and genuine leather strap or stainless steel bracelet.",
    },
    {
      id: "28",
      name: "Cocktail Making Kit",
      category: "kitchen",
      price: 1999,
      brand: "Crafthouse",
      imageUrl:
        "https://i.pinimg.com/736x/2a/a8/3b/2aa83b74412cb60224cbc5c43f848744.jpg",
      websiteLink: "https://www.williams-sonoma.com/crafthouse",
      rating: 4.6,
      description:
        "Professional-grade cocktail set with stainless steel shaker, jigger, strainer, bar spoon, and recipe book for crafting perfect drinks at home.",
    },
    {
      id: "29",
      name: "Luxury Throw Blanket",
      category: "home",
      price: 19500,
      brand: "Pendleton",
      imageUrl:
        "https://i.pinimg.com/736x/9d/ef/00/9def0074a5ab5a9c4a36f705eaaf79c0.jpg",
      websiteLink: "https://www.pendleton-usa.com",
      rating: 4.7,
      description:
        "Heirloom-quality wool throw blanket with distinctive pattern inspired by Native American designs, made in the USA with premium virgin wool.",
    },
    {
      id: "30",
      name: "Wireless Earbuds",
      category: "electronics",
      price: 23500,
      brand: "Apple",
      imageUrl:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-4-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=WnVKRVRUTFVsYThXaWkydWViL1Q3ZDZGTE9TV3RDcGJJclBqdUtzdTJYYjNHc3NlSmU2dzJyR1kxZEwyTE1neUJkRlpCNVhYU3AwTldRQldlSnpRa0NZZXAxWFNjRXhITDI1RVE5YVpyU0E",
      websiteLink: "https://www.apple.com",
      rating: 4.7,
      description:
        "True wireless earbuds with active noise cancellation, transparency mode, adaptive EQ, and up to 24 hours of battery life with charging case.",
    },
    {
      id: "31",
      name: "Men's Dress Shoes",
      category: "clothing",
      price: 34500,
      brand: "Allen Edmonds",
      imageUrl:
        "https://i.pinimg.com/736x/a6/d0/8d/a6d08de90515a4913ea76f5f4e5f7ec1.jpg",
      websiteLink: "https://www.allenedmonds.com",
      rating: 4.8,
      description:
        "Handcrafted full-grain leather oxford dress shoes with Goodyear welted construction, cork footbed, and premium leather soles for lasting comfort.",
    },
    {
      id: "32",
      name: "Spa Gift Basket",
      category: "beauty",
      price: 11999,
      brand: "Lovery",
      imageUrl:
        "https://i.pinimg.com/736x/c3/9c/c9/c39cc95ec42ca2e05cf3734b804d0bc2.jpg",
      websiteLink: "https://www.lovery.com",
      rating: 4.6,
      description:
        "Luxurious spa gift set with bath bombs, shower gel, body lotion, bath salts, and scented candle in a reusable decorative basket.",
    },
    {
      id: "33",
      name: "Board Game Collection",
      category: "entertainment",
      price: 14999,
      brand: "Hasbro",
      imageUrl:
        "https://i.pinimg.com/736x/38/56/10/3856105fd7f230ddb61d665c6beff4c6.jpg",
      websiteLink: "https://www.hasbro.com",
      rating: 4.5,
      description:
        "Collection of five classic family board games including Monopoly, Scrabble, Clue, Risk, and Trivial Pursuit for endless entertainment options.",
    },
    {
      id: "34",
      name: "Leather Travel Bag",
      category: "accessories",
      price: 28500,
      brand: "Samsonite",
      imageUrl:
        "https://i.pinimg.com/736x/1f/9d/55/1f9d55796297bf195cdecf36801cf860.jpg",
      websiteLink: "https://www.samsonite.com",
      rating: 4.7,
      description:
        "Durable full-grain leather weekend duffel with padded laptop sleeve, multiple organizational pockets, and detachable shoulder strap.",
    },
    {
      id: "35",
      name: "Virtual Reality Headset",
      category: "electronics",
      price: 42500,
      brand: "Oculus",
      imageUrl:
        "https://lookaside.fbsbx.com/elementpath/media/?media_id=482519111424546&version=1725906607&transcode_extension=webp",
      websiteLink: "https://www.oculus.com",
      rating: 4.7,
      description:
        "Immersive VR headset with high-resolution display, integrated audio, intuitive controllers, and access to hundreds of games and experiences.",
    },
    {
      id: "36",
      name: "Handcrafted Ceramic Mug Set",
      category: "kitchen",
      price: 8999,
      brand: "Anthropologie",
      imageUrl:
        "https://images.urbndata.com/is/image/Anthropologie/79272779_038_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=960",
      websiteLink: "https://www.anthropologie.com",
      rating: 4.5,
      description:
        "Set of four artisan-made ceramic mugs with unique glazing and hand-painted details, each with slightly different character and charm.",
    },
    {
      id: "37",
      name: "Wool Dress Coat",
      category: "clothing",
      price: 38500,
      brand: "J.Crew",
      imageUrl:
        "https://www.jcrew.com/s7-img-facade/CC208_NA6903?hei=640&crop=0,0,512,0",
      websiteLink: "https://www.jcrew.com",
      rating: 4.6,
      description:
        "Classic tailored wool-blend coat with notch lapels, welt pockets, and back vent, fully lined for warmth and professional style.",
    },
    {
      id: "38",
      name: "Smart Fitness Scale",
      category: "fitness",
      price: 2999,
      brand: "Withings",
      imageUrl:
        "https://image-cache.withings.com/site/media/wi_products/body-smart-white-kg-packshot.webp?fit&src=png&h=800",
      websiteLink: "https://www.withings.com",
      rating: 4.6,
      description:
        "Wi-Fi connected body composition scale that measures weight, BMI, body fat, muscle mass, and more, syncing data to smartphone apps.",
    },
    {
      id: "39",
      name: "Gourmet Olive Oil Set",
      category: "food",
      price: 10500,
      brand: "Williams Sonoma",
      imageUrl:
        "https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202445/0005/img51o.jpg",
      websiteLink: "https://www.williams-sonoma.com",
      rating: 4.7,
      description:
        "Collection of three premium extra virgin olive oils from distinguished growing regions, presented in elegant glass bottles with pour spouts.",
    },
    {
      id: "40",
      name: "Bluetooth Portable Speaker",
      category: "electronics",
      price: 18999,
      brand: "JBL",
      imageUrl:
        "https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw0bb6b981/1_JBL_FLIP6_HERO_RED_29399_x1.png?sw=300&sh=300",
      websiteLink: "https://www.jbl.com",
      rating: 4.6,
      description:
        "Waterproof Bluetooth speaker with 12 hours of playtime, powerful bass radiators, and durable design for outdoor adventures and poolside use.",
    },
    {
      id: "41",
      name: "Luxury Pen Set",
      category: "office",
      price: 23500,
      brand: "Cross",
      imageUrl:
        "https://cross.com/cdn/shop/files/jz8vraxauhwfcmfv1ovo_2.jpg?v=1718648322&width=533",
      websiteLink: "https://www.cross.com",
      rating: 4.7,
      description:
        "Elegant writing set featuring a ballpoint pen and fountain pen with 23K gold-plated accents, presented in a premium gift box.",
    },
    {
      id: "42",
      name: "Indoor Herb Garden Kit",
      category: "kitchen",
      price: 8500,
      brand: "AeroGarden",
      imageUrl:
        "https://aerogarden.com/dw/image/v2/BGFS_PRD/on/demandware.static/-/Sites-consolidated-master-catalog/default/dwb5a87c70/images/hi-res/Grow%20Lights/Trio%20Grow%20Lights/082522_JV_A_0544_Alt_2.jpeg?sw=800&sh=800",
      websiteLink: "https://www.aerogarden.com",
      rating: 4.5,
      description:
        "Compact hydroponic growing system with LED grow lights, automated reminders, and seed pods for growing fresh herbs year-round indoors.",
    },
    {
      id: "43",
      name: "Whiskey Decanter Set",
      category: "home",
      price: 12999,
      brand: "Waterford",
      imageUrl:
        "https://www.waterford.com/-/media/products/2023/08/15/02/42/resource_waterfordemea_1058536.jpg?q=100&iw=1288&ih=1288&crop=1",
      websiteLink: "https://www.waterford.com",
      rating: 4.8,
      description:
        "Crystal whiskey decanter with matching set of four rocks glasses, featuring classic cut design for an elegant display and serving option.",
    },
    {
      id: "44",
      name: "Leather Gloves",
      category: "accessories",
      price: 11999,
      brand: "UGG",
      imageUrl:
        "https://dms.deckers.com/ugg/image/upload/f_auto,q_40,dpr_2/b_rgb:f4f2ee/w_966/v1727812966/101031-CHE_1.png?_s=RAABAB0",
      websiteLink: "https://www.ugg.com",
      rating: 4.6,
      description:
        "Luxurious genuine leather gloves lined with soft cashmere, featuring touchscreen capability for using digital devices without removing gloves.",
    },
    {
      id: "45",
      name: "Digital Camera",
      category: "electronics",
      price: 40000,
      brand: "Canon",
      imageUrl:
        "https://in.canon/media/image/2023/06/30/ff78050bfffc4c8aa2e47d6a24388293_EOS+PR+Detail+page.png",
      websiteLink: "https://www.canon.com",
      rating: 4.7,
      description:
        "High-performance mirrorless camera with 24.1MP APS-C sensor, 4K video capability, built-in Wi-Fi, and versatile kit lens for stunning photography.",
    },
    {
      id: "46",
      name: "Lipsticks",
      category: "Beauty",
      price: 4000,
      brand: "MAC",
      imageUrl:
        "https://i.pinimg.com/736x/9e/55/84/9e55845e147aae69c18c8eaa758dc48c.jpg",
      websiteLink: "https://www.maccosmetics.com",
      rating: 4.8,
      description:
        "Luxurious 100% mulberry silk pajama set with button-front top and elasticized pants, providing optimal comfort and temperature regulation.",
    },
    {
      id: "47",
      name: "Artisanal Cheese Board",
      category: "kitchen",
      price: 7775,
      brand: "Crate & Barrel",
      imageUrl:
        "https://cb.scene7.com/is/image/Crate/MateoServingPaddleBoardSHS19?$web_pdp_main_carousel_high$",
      websiteLink: "https://www.crateandbarrel.com",
      rating: 4.6,
      description:
        "Handcrafted wooden cheese board with inlaid marble surface, complete with three matching cheese knives for perfect entertaining.",
    },
    {
      id: "48",
      name: "Seeding Transplant Tongs",
      category: "home",
      price: 739.9,
      brand: "Gardener's Supply",
      imageUrl:
        "https://assets.gardeners.com/transform/PDP_Main/af83046c-e50a-4da3-8cf3-a05db80c6dd5/8612047_026-tif?w=840&h=1120",
      websiteLink: "https://www.gardeners.com",
      rating: 4.3,
      description:
        "Wireless plant monitor that tracks soil moisture, light, temperature, and nutrients, sending real-time updates and care recommendations to your smartphone.",
    },
    {
      id: "49",
      name: "Designer Tie",
      category: "accessories",
      price: 785,
      brand: "Brooks Brothers",
      imageUrl:
        "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/brooks-brothers/100206732_gold/0/af02vXI9El-410391159001_1_3956.webp",
      websiteLink: "https://www.brooksbrothers.com",
      rating: 4.7,
      description:
        "Handcrafted pure silk necktie with timeless pattern, made in Italy with meticulous attention to detail and exceptional draping quality.",
    },
    {
      id: "50",
      name: "Aromatherapy Diffuser",
      category: "home",
      price: 759.99,
      brand: "Vitruvi",
      imageUrl:
        "https://vitruvi.com/cdn/shop/files/pdp_best-sleep-bundle_white_gallery_1_image_04a44922-45c8-4e3f-9769-099b3e84ce48.png?v=1740101561&width=990",
      websiteLink: "https://www.vitruvi.com",
      rating: 4.6,
      description:
        "Stylish ceramic ultrasonic essential oil diffuser with customizable mist settings, automatic shut-off, and soft ambient LED light for relaxation.",
    },
  ];
  const [gifts, setGifts] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeWishlistId, setActiveWishlistId] = useState(null);
  const [userWishlists, setUserWishlists] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Get auth instance
  const auth = getAuth();

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated in GiftIdeas:", user.email);
        setCurrentUser(user);
      } else {
        console.log("No user authenticated in GiftIdeas");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Simulate API loading with setTimeout
    setLoading(true);
    setTimeout(() => {
      setGifts(localGiftData);
      setAllGifts(localGiftData);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(localGiftData.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);

      setLoading(false);

      // Success notification
    }, 1000); // Simulate 1 second loading time

    // Don't fetch wishlists here, we'll do it when user changes
  }, []);

  // Fetch user's wishlists when user changes
  useEffect(() => {
    if (currentUser) {
      setupWishlistsListener();
    } else {
      setUserWishlists([]);
      setActiveWishlistId(null);
    }
  }, [currentUser]);

  // Use a real-time listener for wishlists
  const setupWishlistsListener = () => {
    if (!currentUser) return;

    console.log(
      "Setting up real-time wishlists listener for:",
      currentUser.email
    );

    const wishlistsRef = ref(database, "wishlists");
    const unsubscribe = onValue(
      wishlistsRef,
      (snapshot) => {
        console.log("Wishlists data changed in GiftIdeas component");

        if (!snapshot.exists()) {
          console.log("No wishlists found");
          setUserWishlists([]);
          return;
        }

        const data = snapshot.val();

        // Match by email (as used in CreateWishlist component)
        const userWishlistsData = Object.entries(data)
          .filter(([_, wishlist]) => wishlist.owner === currentUser.email)
          .map(([id, wishlist]) => ({ id, ...wishlist }));

        console.log(
          "Found wishlists for current user:",
          userWishlistsData.length
        );
        setUserWishlists(userWishlistsData);

        // If user has wishlists but no active one selected, select the first one
        if (userWishlistsData.length > 0 && !activeWishlistId) {
          setActiveWishlistId(userWishlistsData[0].id);
        }
      },
      (error) => {
        console.error("Error fetching wishlists:", error);
      }
    );

    // Return cleanup function
    return unsubscribe;
  };

  const addToWishlist = async (gift) => {
    if (!currentUser) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add items to your wishlist",
        icon: "warning",
      });
      return;
    }

    // If user has no wishlists or no active wishlist is selected
    if (userWishlists.length === 0) {
      const createNew = await Swal.fire({
        title: "No Wishlist Found",
        text: "Would you like to create a new wishlist?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Create Wishlist",
        cancelButtonText: "Cancel",
      });

      if (createNew.isConfirmed) {
        // Create a new wishlist
        await createNewWishlist(gift);
      }
      return;
    }

    // If user has multiple wishlists, let them select which one to use
    let targetWishlistId = activeWishlistId;

    if (userWishlists.length > 1) {
      const { value: wishlistId } = await Swal.fire({
        title: "Select Wishlist",
        input: "select",
        inputOptions: Object.fromEntries(
          userWishlists.map((list) => [list.id, list.title])
        ),
        inputPlaceholder: "Select a wishlist",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve("You need to select a wishlist");
            } else {
              resolve();
            }
          });
        },
      });

      if (!wishlistId) return; // User cancelled
      targetWishlistId = wishlistId;
    }

    // Format gift data for wishlist
    const wishlistItem = {
      name: gift.name,
      imageUrl: gift.imageUrl || "https://via.placeholder.com/150",
      link: gift.websiteLink || "",
      category: gift.category || "Other",
      price: gift.price ? parseFloat(gift.price) : null,
      description: gift.description || "",
      priority: 3, // Default priority
      addedAt: new Date().toISOString(),
      originalId: gift.id, // Keep reference to original gift
      brand: gift.brand || "",
    };

    try {
      // Reference to items collection in the selected wishlist
      const itemsRef = ref(database, `wishlists/${targetWishlistId}/items`);
      const newItemRef = push(itemsRef);

      await set(newItemRef, wishlistItem);

      Swal.fire({
        title: "Added to Wishlist!",
        text: `${gift.name} has been added to your wishlist`,
        icon: "success",
        showClass: {
          popup: "animate__animated animate__bounceIn",
        },
      });

      console.log("Added to wishlist:", gift, "at key:", newItemRef.key);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add item to wishlist. Please try again.",
        icon: "error",
      });
    }
  };

  // Create a new wishlist and add the gift to it
  const createNewWishlist = async (gift) => {
    if (!currentUser) return;

    const { value: title } = await Swal.fire({
      title: "Create New Wishlist",
      input: "text",
      inputLabel: "Wishlist Title",
      inputPlaceholder: "Enter wishlist title",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a title!";
        }
      },
    });

    if (!title) return; // User cancelled

    const { value: description } = await Swal.fire({
      title: "Wishlist Description",
      input: "textarea",
      inputLabel: "Description (optional)",
      inputPlaceholder: "Enter wishlist description",
      showCancelButton: true,
    });

    // Create new wishlist object - use email as owner to match CreateWishlist
    const newWishlist = {
      owner: currentUser.email, // Match the CreateWishlist component format
      title,
      description: description || "",
      createdAt: new Date().toISOString(),
      privacy: "private", // Default privacy setting
    };

    try {
      // Add the wishlist to the database
      const wishlistsRef = ref(database, "wishlists");
      const newWishlistRef = push(wishlistsRef);

      await set(newWishlistRef, newWishlist);

      // Get the new wishlist ID
      const newWishlistId = newWishlistRef.key;

      // Update local state (though real-time listener should handle this)
      const completeWishlist = { id: newWishlistId, ...newWishlist };
      setUserWishlists((prevWishlists) => [...prevWishlists, completeWishlist]);
      setActiveWishlistId(newWishlistId);

      // Now add the gift to this new wishlist
      if (gift) {
        const wishlistItem = {
          name: gift.name,
          imageUrl: gift.imageUrl || "https://via.placeholder.com/150",
          link: gift.websiteLink || "",
          category: gift.category || "Other",
          price: gift.price ? parseFloat(gift.price) : null,
          description: gift.description || "",
          priority: 3, // Default priority
          addedAt: new Date().toISOString(),
          originalId: gift.id, // Keep reference to original gift
          brand: gift.brand || "",
        };

        const itemsRef = ref(database, `wishlists/${newWishlistId}/items`);
        const newItemRef = push(itemsRef);

        await set(newItemRef, wishlistItem);
      }

      Swal.fire({
        title: "Success!",
        text: gift
          ? `Created new wishlist "${title}" and added ${gift.name}`
          : `Created new wishlist "${title}"`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error creating wishlist:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to create wishlist. Please try again.",
        icon: "error",
      });
    }
  };

  const visitGiftWebsite = (e, url) => {
    // Prevent the default event and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (url) {
      // For demo purposes, show an alert instead of opening the link
      // Swal.fire({
      //   title: 'External Link',
      //   text: `Would navigate to: ${url}`,
      //   icon: 'info'
      // });

      // Uncomment this to actually open the link
      window.open(url, "_blank");
    } else {
      Swal.fire({
        title: "No Link Available",
        text: "This item does not have a website link.",
        icon: "info",
      });
    }
  };

  const viewGiftDetails = (gift) => {
    Swal.fire({
      title: gift.name,
      html: `
        <div class="mb-3">
          ${
            gift.brand
              ? `<div class="mb-3"><strong>Brand:</strong> ${gift.brand}</div>`
              : ""
          }
          ${
            gift.category
              ? `<div class="mb-3"><strong>Category:</strong> ${gift.category}</div>`
              : ""
          }
          ${
            gift.price
              ? `<div class="mb-3"><strong>Price:</strong> ₹${parseFloat(
                  gift.price
                ).toFixed(2)}</div>`
              : ""
          }
          ${
            gift.rating
              ? `<div class="mb-3"><strong>Rating:</strong> ${gift.rating} / 5</div>`
              : ""
          }
          ${
            gift.description
              ? `<div class="mb-3"><strong>Description:</strong><br>${gift.description}</div>`
              : ""
          }
        </div>
      `,
      imageUrl: gift.imageUrl || "https://via.placeholder.com/150",
      imageWidth: 300,
      imageHeight: 300,
      showCancelButton: true,
      confirmButtonText: gift.websiteLink ? "Visit Website" : "Close",
      cancelButtonText: "Add to Wishlist",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
    }).then((result) => {
      if (result.isConfirmed && gift.websiteLink) {
        // Redirect to the item's website
        visitGiftWebsite(null, gift.websiteLink);
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
      filtered = filtered.filter(
        (gift) =>
          gift.name.toLowerCase().includes(lowerTerm) ||
          (gift.brand && gift.brand.toLowerCase().includes(lowerTerm)) ||
          (gift.description &&
            gift.description.toLowerCase().includes(lowerTerm))
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((gift) => gift.category === category);
    }

    setGifts(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setGifts(allGifts);
  };

  // if (loading) {
  //   return (
  //     <Container className="text-center mt-5">
  //       <div className="animate__animated animate__pulse animate__infinite">
  //         <FaSpinner className="fa-spin" size={30} />
  //         <h3 className="mt-3">Loading gift ideas...</h3>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container className="py-3">
      <h1 className="text-center mb-4 animate__animated animate__fadeIn">
        <FaGift className="text-primary me-2" /> Gift Ideas
      </h1>

      {/* Show wishlist status if user is logged in */}
      {currentUser && (
        <div className="text-center mb-4">
          <p>
            {userWishlists.length > 0
              ? `You have ${userWishlists.length} wishlist.`
              : "You have no wishlists yet. Adding items will create one for you."}
          </p>
        </div>
      )}

      {/* Search and Filter Section */}
      <Row className="mb-4 align-items-stretch">
        {/* Search Input */}
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <InputGroup size="md" className="h-100">
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

        {/* Category Select */}
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <InputGroup size="md" className="h-100">
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
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).toLowerCase()}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>

        {/* Clear Button */}
        <Col xs={12} md={2}>
          <Button
            variant="outline-secondary"
            onClick={clearFilters}
            className="w-100 h-100"
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
          <p className="text-muted">
            Try different search terms or clear filters
          </p>
          <Button variant="primary" className="mt-3" onClick={clearFilters}>
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
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                {/* Main card body that opens details on click */}
                <div
                  onClick={() => viewGiftDetails(gift)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={gift.imageUrl || "https://via.placeholder.com/150"}
                      className="animate__animated animate__zoomIn"
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    {/* Visit website button */}
                    {gift.websiteLink && (
                      <div
                        className="position-absolute"
                        style={{
                          top: "10px",
                          right: "10px",
                          zIndex: 10,
                        }}
                        onClick={(e) => visitGiftWebsite(e, gift.websiteLink)}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            padding: "8px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          }}
                        >
                          <FaExternalLinkAlt className="text-primary" />
                        </Button>
                      </div>
                    )}

                    {gift.price && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          background: "rgba(0,0,0,0.7)",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                        }}
                      >
                        <FaTag className="me-1" /> ₹
                        {parseFloat(gift.price).toFixed(2)}
                      </div>
                    )}

                    {/* Display rating if available */}
                    {gift.rating && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "10px",
                          background: "rgba(0,0,0,0.7)",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
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
                          {gift.category.charAt(0).toUpperCase() + gift.category.slice(1).toLowerCase()}

                        </div>
                      )}
                    </div>

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

                      <Button
                        variant="outline-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(gift);
                        }}
                      >
                        <FaHeart className="me-2" /> Add to Wishlist
                      </Button>
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
