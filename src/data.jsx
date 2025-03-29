
    const giftItems = [
        // Dresses - 50 items
        {
          id: 1,
          name: "Elegant Evening Gown",
          category: "dress",
          price: 299.99,
          brand: "Versace",
          imageUrl: "https://example.com/images/versace-evening-gown.jpg"
        },
        {
          id: 2,
          name: "Summer Floral Dress",
          category: "dress",
          price: 189.99,
          brand: "Gucci",
          imageUrl: "https://example.com/images/gucci-floral-dress.jpg"
        },
        {
          id: 3,
          name: "Silk Cocktail Dress",
          category: "dress",
          price: 245.00,
          brand: "Prada",
          imageUrl: "https://example.com/images/prada-cocktail-dress.jpg"
        },
        {
          id: 4,
          name: "Casual Maxi Dress",
          category: "dress",
          price: 129.99,
          brand: "Ralph Lauren",
          imageUrl: "https://example.com/images/ralph-lauren-maxi-dress.jpg"
        },
        {
          id: 5,
          name: "Satin Slip Dress",
          category: "dress",
          price: 175.00,
          brand: "Calvin Klein",
          imageUrl: "https://example.com/images/calvin-klein-slip-dress.jpg"
        },
        {
          id: 6,
          name: "Lace Midi Dress",
          category: "dress",
          price: 210.00,
          brand: "Dolce & Gabbana",
          imageUrl: "https://example.com/images/dolce-gabbana-lace-dress.jpg"
        },
        {
          id: 7,
          name: "Velvet Evening Dress",
          category: "dress",
          price: 279.99,
          brand: "Burberry",
          imageUrl: "https://example.com/images/burberry-velvet-dress.jpg"
        },
        {
          id: 8,
          name: "Wrap Midi Dress",
          category: "dress",
          price: 159.99,
          brand: "Michael Kors",
          imageUrl: "https://example.com/images/michael-kors-wrap-dress.jpg"
        },
        {
          id: 9,
          name: "Pleated Chiffon Dress",
          category: "dress",
          price: 189.99,
          brand: "Armani",
          imageUrl: "https://example.com/images/armani-chiffon-dress.jpg"
        },
        {
          id: 10,
          name: "Embellished Party Dress",
          category: "dress",
          price: 225.00,
          brand: "Valentino",
          imageUrl: "https://example.com/images/valentino-party-dress.jpg"
        },
        {
          id: 11,
          name: "A-Line Midi Dress",
          category: "dress",
          price: 165.00,
          brand: "Chanel",
          imageUrl: "https://example.com/images/chanel-aline-dress.jpg"
        },
        {
          id: 12,
          name: "Off-Shoulder Gown",
          category: "dress",
          price: 289.99,
          brand: "Dior",
          imageUrl: "https://example.com/images/dior-off-shoulder-gown.jpg"
        },
        {
          id: 13,
          name: "Sequin Cocktail Dress",
          category: "dress",
          price: 199.99,
          brand: "Tom Ford",
          imageUrl: "https://example.com/images/tom-ford-sequin-dress.jpg"
        },
        {
          id: 14,
          name: "Bodycon Mini Dress",
          category: "dress",
          price: 145.00,
          brand: "Balmain",
          imageUrl: "https://example.com/images/balmain-bodycon-dress.jpg"
        },
        {
          id: 15,
          name: "Halter Neck Gown",
          category: "dress",
          price: 265.00,
          brand: "Louis Vuitton",
          imageUrl: "https://example.com/images/louis-vuitton-halter-gown.jpg"
        },
        {
          id: 16,
          name: "Tulle Evening Dress",
          category: "dress",
          price: 249.99,
          brand: "Oscar de la Renta",
          imageUrl: "https://example.com/images/oscar-de-la-renta-tulle-dress.jpg"
        },
        {
          id: 17,
          name: "Ruffled Summer Dress",
          category: "dress",
          price: 139.99,
          brand: "Marc Jacobs",
          imageUrl: "https://example.com/images/marc-jacobs-ruffled-dress.jpg"
        },
        {
          id: 18,
          name: "Knit Sweater Dress",
          category: "dress",
          price: 155.00,
          brand: "Stella McCartney",
          imageUrl: "https://example.com/images/stella-mccartney-sweater-dress.jpg"
        },
        {
          id: 19,
          name: "Printed Maxi Dress",
          category: "dress",
          price: 179.99,
          brand: "Roberto Cavalli",
          imageUrl: "https://example.com/images/roberto-cavalli-printed-dress.jpg"
        },
        {
          id: 20,
          name: "Strapless Ball Gown",
          category: "dress",
          price: 319.99,
          brand: "Elie Saab",
          imageUrl: "https://example.com/images/elie-saab-ball-gown.jpg"
        },
        {
          id: 21,
          name: "Embroidered Shift Dress",
          category: "dress",
          price: 195.00,
          brand: "Fendi",
          imageUrl: "https://example.com/images/fendi-shift-dress.jpg"
        },
        {
          id: 22,
          name: "Tiered Maxi Dress",
          category: "dress",
          price: 235.00,
          brand: "Alexander McQueen",
          imageUrl: "https://example.com/images/alexander-mcqueen-tiered-dress.jpg"
        },
        {
          id: 23,
          name: "Belted Shirt Dress",
          category: "dress",
          price: 149.99,
          brand: "Tommy Hilfiger",
          imageUrl: "https://example.com/images/tommy-hilfiger-shirt-dress.jpg"
        },
        {
          id: 24,
          name: "Asymmetric Hem Dress",
          category: "dress",
          price: 179.99,
          brand: "Givenchy",
          imageUrl: "https://example.com/images/givenchy-asymmetric-dress.jpg"
        },
        {
          id: 25,
          name: "Draped Jersey Dress",
          category: "dress",
          price: 165.00,
          brand: "Saint Laurent",
          imageUrl: "https://example.com/images/saint-laurent-jersey-dress.jpg"
        },
        {
          id: 26,
          name: "Puff Sleeve Mini Dress",
          category: "dress",
          price: 155.00,
          brand: "Moschino",
          imageUrl: "https://example.com/images/moschino-puff-sleeve-dress.jpg"
        },
        {
          id: 27,
          name: "Tweed Fit & Flare Dress",
          category: "dress",
          price: 219.99,
          brand: "Chanel",
          imageUrl: "https://example.com/images/chanel-tweed-dress.jpg"
        },
        {
          id: 28,
          name: "Corset Bodice Dress",
          category: "dress",
          price: 209.99,
          brand: "Vivienne Westwood",
          imageUrl: "https://example.com/images/vivienne-westwood-corset-dress.jpg"
        },
        {
          id: 29,
          name: "Cape Sleeve Midi Dress",
          category: "dress",
          price: 189.99,
          brand: "Valentino",
          imageUrl: "https://example.com/images/valentino-cape-dress.jpg"
        },
        {
          id: 30,
          name: "Cut-Out Evening Dress",
          category: "dress",
          price: 239.99,
          brand: "Balmain",
          imageUrl: "https://example.com/images/balmain-cutout-dress.jpg"
        },
        {
          id: 31,
          name: "Ruched Bodycon Dress",
          category: "dress",
          price: 159.99,
          brand: "Versace",
          imageUrl: "https://example.com/images/versace-ruched-dress.jpg"
        },
        {
          id: 32,
          name: "Layered Cocktail Dress",
          category: "dress",
          price: 185.00,
          brand: "Armani",
          imageUrl: "https://example.com/images/armani-layered-dress.jpg"
        },
        {
          id: 33,
          name: "Feather Trimmed Mini Dress",
          category: "dress",
          price: 229.99,
          brand: "Prada",
          imageUrl: "https://example.com/images/prada-feather-dress.jpg"
        },
        {
          id: 34,
          name: "Beaded Formal Gown",
          category: "dress",
          price: 329.99,
          brand: "Elie Saab",
          imageUrl: "https://example.com/images/elie-saab-beaded-gown.jpg"
        },
        {
          id: 35,
          name: "Smocked Maxi Dress",
          category: "dress",
          price: 169.99,
          brand: "Chloe",
          imageUrl: "https://example.com/images/chloe-smocked-dress.jpg"
        },
        {
          id: 36,
          name: "Fringe Flapper Dress",
          category: "dress",
          price: 199.99,
          brand: "Gucci",
          imageUrl: "https://example.com/images/gucci-fringe-dress.jpg"
        },
        {
          id: 37,
          name: "Cold Shoulder Gown",
          category: "dress",
          price: 249.99,
          brand: "Dior",
          imageUrl: "https://example.com/images/dior-cold-shoulder-gown.jpg"
        },
        {
          id: 38,
          name: "Bow Detail Midi Dress",
          category: "dress",
          price: 179.99,
          brand: "Miu Miu",
          imageUrl: "https://example.com/images/miu-miu-bow-dress.jpg"
        },
        {
          id: 39,
          name: "One Shoulder Cocktail Dress",
          category: "dress",
          price: 195.00,
          brand: "Givenchy",
          imageUrl: "https://example.com/images/givenchy-one-shoulder-dress.jpg"
        },
        {
          id: 40,
          name: "Metallic Party Dress",
          category: "dress",
          price: 185.00,
          brand: "Michael Kors",
          imageUrl: "https://example.com/images/michael-kors-metallic-dress.jpg"
        },
        {
          id: 41,
          name: "Patchwork Midi Dress",
          category: "dress",
          price: 179.99,
          brand: "Coach",
          imageUrl: "https://example.com/images/coach-patchwork-dress.jpg"
        },
        {
          id: 42,
          name: "Flared Sleeve Mini Dress",
          category: "dress",
          price: 159.99,
          brand: "Chloe",
          imageUrl: "https://example.com/images/chloe-flared-sleeve-dress.jpg"
        },
        {
          id: 43,
          name: "Pleated Shirt Dress",
          category: "dress",
          price: 175.00,
          brand: "Burberry",
          imageUrl: "https://example.com/images/burberry-pleated-dress.jpg"
        },
        {
          id: 44,
          name: "Tie Waist Wrap Dress",
          category: "dress",
          price: 165.00,
          brand: "Diane von Furstenberg",
          imageUrl: "https://example.com/images/dvf-wrap-dress.jpg"
        },
        {
          id: 45,
          name: "Broderie Anglaise Dress",
          category: "dress",
          price: 189.99,
          brand: "Self-Portrait",
          imageUrl: "https://example.com/images/self-portrait-broderie-dress.jpg"
        },
        {
          id: 46,
          name: "Keyhole Back Evening Dress",
          category: "dress",
          price: 229.99,
          brand: "Tom Ford",
          imageUrl: "https://example.com/images/tom-ford-keyhole-dress.jpg"
        },
        {
          id: 47,
          name: "High Neck Lace Dress",
          category: "dress",
          price: 199.99,
          brand: "Zimmermann",
          imageUrl: "https://example.com/images/zimmermann-lace-dress.jpg"
        },
        {
          id: 48,
          name: "Scalloped Hem Dress",
          category: "dress",
          price: 159.99,
          brand: "Chloe",
          imageUrl: "https://example.com/images/chloe-scalloped-dress.jpg"
        },
        {
          id: 49,
          name: "Sheer Panel Evening Dress",
          category: "dress",
          price: 245.00,
          brand: "Balenciaga",
          imageUrl: "https://example.com/images/balenciaga-sheer-dress.jpg"
        },
        {
          id: 50,
          name: "Structured Midi Dress",
          category: "dress",
          price: 209.99,
          brand: "Alexander Wang",
          imageUrl: "https://example.com/images/alexander-wang-structured-dress.jpg"
        },
      
        // Perfumes - 50 items
        {
          id: 51,
          name: "Bloom Eau de Parfum",
          category: "perfume",
          price: 135.00,
          brand: "Gucci",
          imageUrl: "https://example.com/images/gucci-bloom.jpg"
        },
        {
          id: 52,
          name: "J'adore Eau de Parfum",
          category: "perfume",
          price: 145.00,
          brand: "Dior",
          imageUrl: "https://example.com/images/dior-jadore.jpg"
        },
        {
          id: 53,
          name: "Coco Mademoiselle",
          category: "perfume",
          price: 152.00,
          brand: "Chanel",
          imageUrl: "https://example.com/images/chanel-coco-mademoiselle.jpg"
        },
        {
          id: 54,
          name: "Black Opium",
          category: "perfume",
          price: 129.99,
          brand: "Yves Saint Laurent",
          imageUrl: "https://example.com/images/ysl-black-opium.jpg"
        },
        {
          id: 55,
          name: "La Vie Est Belle",
          category: "perfume",
          price: 119.00,
          brand: "Lancôme",
          imageUrl: "https://example.com/images/lancome-la-vie-est-belle.jpg"
        },
        {
          id: 56,
          name: "Daisy Eau de Toilette",
          category: "perfume",
          price: 89.99,
          brand: "Marc Jacobs",
          imageUrl: "https://example.com/images/marc-jacobs-daisy.jpg"
        },
        {
          id: 57,
          name: "Sì Eau de Parfum",
          category: "perfume",
          price: 126.00,
          brand: "Giorgio Armani",
          imageUrl: "https://example.com/images/armani-si.jpg"
        },
        {
          id: 58,
          name: "Light Blue",
          category: "perfume",
          price: 92.00,
          brand: "Dolce & Gabbana",
          imageUrl: "https://example.com/images/dolce-gabbana-light-blue.jpg"
        },
        {
          id: 59,
          name: "Flowerbomb",
          category: "perfume",
          price: 115.00,
          brand: "Viktor & Rolf",
          imageUrl: "https://example.com/images/viktor-rolf-flowerbomb.jpg"
        },
        {
          id: 60,
          name: "Miss Dior",
          category: "perfume",
          price: 138.00,
          brand: "Dior",
          imageUrl: "https://example.com/images/dior-miss-dior.jpg"
        },
        {
          id: 61,
          name: "Chance Eau Fraîche",
          category: "perfume",
          price: 142.00,
          brand: "Chanel",
          imageUrl: "https://example.com/images/chanel-chance.jpg"
        },
        {
          id: 62,
          name: "Good Girl",
          category: "perfume",
          price: 129.99,
          brand: "Carolina Herrera",
          imageUrl: "https://example.com/images/carolina-herrera-good-girl.jpg"
        },
        {
          id: 63,
          name: "Mon Paris",
          category: "perfume",
          price: 124.00,
          brand: "Yves Saint Laurent",
          imageUrl: "https://example.com/images/ysl-mon-paris.jpg"
        },
        {
          id: 64,
          name: "Libre",
          category: "perfume",
          price: 118.00,
          brand: "Yves Saint Laurent",
          imageUrl: "https://example.com/images/ysl-libre.jpg"
        },
        {
          id: 65,
          name: "Angel",
          category: "perfume",
          price: 105.00,
          brand: "Thierry Mugler",
          imageUrl: "https://example.com/images/thierry-mugler-angel.jpg"
        },
        {
          id: 66,
          name: "Bright Crystal",
          category: "perfume",
          price: 98.00,
          brand: "Versace",
          imageUrl: "https://example.com/images/versace-bright-crystal.jpg"
        },
        {
          id: 67,
          name: "My Burberry",
          category: "perfume",
          price: 130.00,
          brand: "Burberry",
          imageUrl: "https://example.com/images/burberry-my-burberry.jpg"
        },
        {
          id: 68,
          name: "Acqua di Gioia",
          category: "perfume",
          price: 115.00,
          brand: "Giorgio Armani",
          imageUrl: "https://example.com/images/armani-acqua-di-gioia.jpg"
        },
        {
          id: 69,
          name: "Guilty",
          category: "perfume",
          price: 99.99,
          brand: "Gucci",
          imageUrl: "https://example.com/images/gucci-guilty.jpg"
        },
        {
          id: 70,
          name: "Nomade",
          category: "perfume",
          price: 112.00,
          brand: "Chloé",
          imageUrl: "https://example.com/images/chloe-nomade.jpg"
        },
        {
          id: 71,
          name: "Idôle",
          category: "perfume",
          price: 123.00,
          brand: "Lancôme",
          imageUrl: "https://example.com/images/lancome-idole.jpg"
        },
        {
          id: 72,
          name: "Dylan Blue Pour Femme",
          category: "perfume",
          price: 95.00,
          brand: "Versace",
          imageUrl: "https://example.com/images/versace-dylan-blue.jpg"
        },
        {
          id: 73,
          name: "L'Interdit",
          category: "perfume",
          price: 125.00,
          brand: "Givenchy",
          imageUrl: "https://example.com/images/givenchy-linterdit.jpg"
        },
        {
          id: 74,
          name: "Joy",
          category: "perfume",
          price: 135.00,
          brand: "Dior",
          imageUrl: "https://example.com/images/dior-joy.jpg"
        },
        {
          id: 75,
          name: "Gabrielle",
          category: "perfume",
          price: 158.00,
          brand: "Chanel",
          imageUrl: "https://example.com/images/chanel-gabrielle.jpg"
        },
        {
          id: 76,
          name: "Alien",
          category: "perfume",
          price: 110.00,
          brand: "Thierry Mugler",
          imageUrl: "https://example.com/images/thierry-mugler-alien.jpg"
        },
        {
          id: 77,
          name: "Pure Poison",
          category: "perfume",
          price: 128.00,
          brand: "Dior",
          imageUrl: "https://example.com/images/dior-pure-poison.jpg"
        },
        {
          id: 78,
          name: "Very Good Girl",
          category: "perfume",
          price: 132.00,
          brand: "Carolina Herrera",
          imageUrl: "https://example.com/images/carolina-herrera-very-good-girl.jpg"
        },
        {
          id: 79,
          name: "Olympéa",
          category: "perfume",
          price: 108.00,
          brand: "Paco Rabanne",
          imageUrl: "https://example.com/images/paco-rabanne-olympea.jpg"
        },
        {
          id: 80,
          name: "Flora Gorgeous Gardenia",
          category: "perfume",
          price: 125.00,
          brand: "Gucci",
          imageUrl: "https://example.com/images/gucci-flora-gorgeous-gardenia.jpg"
        },
        {
          id: 81,
          name: "Chloé Eau de Parfum",
          category: "perfume",
          price: 119.00,
          brand: "Chloé",
          imageUrl: "https://example.com/images/chloe-eau-de-parfum.jpg"
        },
        {
          id: 82,
          name: "Narciso Rouge",
          category: "perfume",
          price: 113.00,
          brand: "Narciso Rodriguez",
          imageUrl: "https://example.com/images/narciso-rodriguez-rouge.jpg"
        },
        {
          id: 83,
          name: "Rouge Malachite",
          category: "perfume",
          price: 295.00,
          brand: "Armani Privé",
          imageUrl: "https://example.com/images/armani-prive-rouge-malachite.jpg"
        },
        {
          id: 84,
          name: "Twilly d'Hermès",
          category: "perfume",
          price: 148.00,
          brand: "Hermès",
          imageUrl: "https://example.com/images/hermes-twilly.jpg"
        },
        {
          id: 85,
          name: "The Only One",
          category: "perfume",
          price: 102.00,
          brand: "Dolce & Gabbana",
          imageUrl: "https://example.com/images/dolce-gabbana-the-only-one.jpg"
        },
        {
          id: 86,
          name: "Modern Princess",
          category: "perfume",
          price: 89.99,
          brand: "Lanvin",
          imageUrl: "https://example.com/images/lanvin-modern-princess.jpg"
        },
        {
          id: 87,
          name: "Velvet Orchid",
          category: "perfume",
          price: 138.00,
          brand: "Tom Ford",
          imageUrl: "https://example.com/images/tom-ford-velvet-orchid.jpg"
        },
        {
          id: 88,
          name: "Scandal",
          category: "perfume",
          price: 115.00,
          brand: "Jean Paul Gaultier",
          imageUrl: "https://example.com/images/jean-paul-gaultier-scandal.jpg"
        },
        {
          id: 89,
          name: "Bombshell",
          category: "perfume",
          price: 85.00,
          brand: "Victoria's Secret",
          imageUrl: "https://example.com/images/victorias-secret-bombshell.jpg"
        },
        {
          id: 90,
          name: "Lady Million",
          category: "perfume",
          price: 109.00,
          brand: "Paco Rabanne",
          imageUrl: "https://example.com/images/paco-rabanne-lady-million.jpg"
        },
        {
          id: 91,
          name: "Signorina",
          category: "perfume",
          price: 97.00,
          brand: "Salvatore Ferragamo",
          imageUrl: "https://example.com/images/ferragamo-signorina.jpg"
        },
        {
          id: 92,
          name: "Wood Sage & Sea Salt",
          category: "perfume",
          price: 142.00,
          brand: "Jo Malone",
          imageUrl: "https://example.com/images/jo-malone-wood-sage.jpg"
        },
        {
          id: 93,
          name: "Woman",
          category: "perfume",
          price: 105.00,
          brand: "Ralph Lauren",
          imageUrl: "https://example.com/images/ralph-lauren-woman.jpg"
        },
        {
          id: 94,
          name: "Florence",
          category: "perfume",
          price: 128.00,
          brand: "Tocca",
          imageUrl: "https://example.com/images/tocca-florence.jpg"
        },
        {
          id: 95,
          name: "Eros Pour Femme",
          category: "perfume",
          price: 115.00,
          brand: "Versace",
          imageUrl: "https://example.com/images/versace-eros-pour-femme.jpg"
        },
        {
          id: 96,
          name: "Goldea The Roman Night",
          category: "perfume",
          price: 118.00,
          brand: "Bvlgari",
          imageUrl: "https://example.com/images/bvlgari-goldea-roman-night.jpg"
        },
        {
          id: 97,
          name: "Amazing Grace",
          category: "perfume",
          price: 79.99,
          brand: "Philosophy",
          imageUrl: "https://example.com/images/philosophy-amazing-grace.jpg"
        },
        {
          id: 98,
          name: "Diamonds",
          category: "perfume",
          price: 95.00,
          brand: "Armani",
          imageUrl: "https://example.com/images/armani-diamonds.jpg"
        },
        {
          id: 99,
          name: "Le Parfum",
          category: "perfume",
          price: 108.00,
          brand: "Elie Saab",
          imageUrl: "https://example.com/images/elie-saab-le-parfum.jpg"
        },
        {
          id: 100,
          name: "Omnia Crystalline",
          category: "perfume",
          price: 89.99,
          brand: "Bvlgari",
          imageUrl: "https://example.com/images/bvlgari-omnia-crystalline.jpg"
        },
      
        // Books - 50 items
        {
          id: 101,
          name: "The Midnight Library",
          category: "book",
          price: 24.99,
          brand: "Penguin Random House",
          imageUrl: "https://example.com/images/midnight-library.jpg"
        },
        {
          id: 102,
          name: "Where the Crawdads Sing",
          category: "book",
          price: 26.99,
          brand: "G.P. Putnam's Sons",
          imageUrl: "https://example.com/images/crawdads-sing.jpg"
        },
        {
          id: 103,
          name: "Educated: A Memoir",
          category: "book",
          price: 28.00,
          brand: "Random House",
          imageUrl: "https://example.com/images/educated-memoir.jpg"
        },
        {
          id: 104,
          name: "Becoming",
          category: "book",
          price: 32.50,
          brand: "Crown Publishing",
          imageUrl: "https://example.com/images/becoming.jpg"
        },
        {
          id: 105,
          name: "The Silent Patient",
          category: "book",
          price: 25.99,
          brand: "Celadon Books",
          imageUrl: "https://example.com/images/silent-patient.jpg"
        },
        {
          id: 106,
          name: "Atomic Habits",
          category: "book",
          price: 27.00,
          brand: "Avery",
          imageUrl: "https://example.com/images/atomic-habits.jpg"
        },
        {
          id: 107,
          name: "Untamed",
          category: "book",
          price: 25.99,
          brand: "Dial Press",
          imageUrl: "https://example.com/images/untamed.jpg"
        },
        {
            id: 108,
            name: "The Vanishing Half",
            category: "book",
            price: 26.95,
            brand: "Riverhead Books",
            imageUrl: "https://example.com/images/vanishing-half.jpg"
          },
          {
            id: 109,
            name: "The Four Winds",
            category: "book",
            price: 28.99,
            brand: "St. Martin's Press",
            imageUrl: "https://example.com/images/four-winds.jpg"
          },
          {
            id: 110,
            name: "Greenlights",
            category: "book",
            price: 30.00,
            brand: "Crown Publishing",
            imageUrl: "https://example.com/images/greenlights.jpg"
          },
          {
            id: 111,
            name: "The Guest List",
            category: "book",
            price: 24.50,
            brand: "William Morrow",
            imageUrl: "https://example.com/images/guest-list.jpg"
          },
          {
            id: 112,
            name: "Circe",
            category: "book",
            price: 27.00,
            brand: "Little, Brown and Company",
            imageUrl: "https://example.com/images/circe.jpg"
          },
          {
            id: 113,
            name: "The Dutch House",
            category: "book",
            price: 26.99,
            brand: "Harper",
            imageUrl: "https://example.com/images/dutch-house.jpg"
          },
          {
            id: 114,
            name: "The Invisible Life of Addie LaRue",
            category: "book",
            price: 26.99,
            brand: "Tor Books",
            imageUrl: "https://example.com/images/addie-larue.jpg"
          },
          {
            id: 115,
            name: "Sapiens: A Brief History of Humankind",
            category: "book",
            price: 32.00,
            brand: "Harper",
            imageUrl: "https://example.com/images/sapiens.jpg"
          },
          {
            id: 116,
            name: "The Song of Achilles",
            category: "book",
            price: 25.99,
            brand: "Ecco",
            imageUrl: "https://example.com/images/song-of-achilles.jpg"
          },
          {
            id: 117,
            name: "The Nightingale",
            category: "book",
            price: 24.99,
            brand: "St. Martin's Press",
            imageUrl: "https://example.com/images/nightingale.jpg"
          },
          {
            id: 118,
            name: "Talking to Strangers",
            category: "book",
            price: 29.00,
            brand: "Little, Brown and Company",
            imageUrl: "https://example.com/images/talking-to-strangers.jpg"
          },
          {
            id: 119,
            name: "The Push",
            category: "book",
            price: 26.00,
            brand: "Pamela Dorman Books",
            imageUrl: "https://example.com/images/the-push.jpg"
          },
          {
            id: 120,
            name: "The Alchemist",
            category: "book",
            price: 24.99,
            brand: "HarperOne",
            imageUrl: "https://example.com/images/alchemist.jpg"
          },
          {
            id: 121,
            name: "The Seven Husbands of Evelyn Hugo",
            category: "book",
            price: 26.00,
            brand: "Washington Square Press",
            imageUrl: "https://example.com/images/evelyn-hugo.jpg"
          },
          {
            id: 122,
            name: "The House in the Cerulean Sea",
            category: "book",
            price: 27.99,
            brand: "Tor Books",
            imageUrl: "https://example.com/images/cerulean-sea.jpg"
          },
          {
            id: 123,
            name: "Klara and the Sun",
            category: "book",
            price: 28.95,
            brand: "Knopf",
            imageUrl: "https://example.com/images/klara-and-sun.jpg"
          },
          {
            id: 124,
            name: "Project Hail Mary",
            category: "book",
            price: 28.99,
            brand: "Ballantine Books",
            imageUrl: "https://example.com/images/hail-mary.jpg"
          },
          {
            id: 125,
            name: "The Midnight Library",
            category: "book",
            price: 26.00,
            brand: "Viking",
            imageUrl: "https://example.com/images/midnight-library.jpg"
          },
          {
            id: 126,
            name: "The Lincoln Highway",
            category: "book",
            price: 30.00,
            brand: "Viking",
            imageUrl: "https://example.com/images/lincoln-highway.jpg"
          },
          {
            id: 127,
            name: "The Last Thing He Told Me",
            category: "book",
            price: 27.00,
            brand: "Simon & Schuster",
            imageUrl: "https://example.com/images/last-thing-he-told-me.jpg"
          },
          {
            id: 128,
            name: "Malibu Rising",
            category: "book",
            price: 28.00,
            brand: "Ballantine Books",
            imageUrl: "https://example.com/images/malibu-rising.jpg"
          },
          {
            id: 129,
            name: "The Love Hypothesis",
            category: "book",
            price: 16.00,
            brand: "Berkley",
            imageUrl: "https://example.com/images/love-hypothesis.jpg"
          },
          {
            id: 130,
            name: "People We Meet on Vacation",
            category: "book",
            price: 15.99,
            brand: "Berkley",
            imageUrl: "https://example.com/images/people-we-meet.jpg"
          },
          {
            id: 131,
            name: "A Court of Silver Flames",
            category: "book",
            price: 28.00,
            brand: "Bloomsbury Publishing",
            imageUrl: "https://example.com/images/silver-flames.jpg"
          },
          {
            id: 132,
            name: "The Paper Palace",
            category: "book",
            price: 27.00,
            brand: "Riverhead Books",
            imageUrl: "https://example.com/images/paper-palace.jpg"
          },
          {
            id: 133,
            name: "A Little Life",
            category: "book",
            price: 30.00,
            brand: "Doubleday",
            imageUrl: "https://example.com/images/little-life.jpg"
          },
          {
            id: 134,
            name: "The Four Agreements",
            category: "book",
            price: 12.95,
            brand: "Amber-Allen Publishing",
            imageUrl: "https://example.com/images/four-agreements.jpg"
          },
          {
            id: 135,
            name: "Normal People",
            category: "book",
            price: 17.00,
            brand: "Hogarth",
            imageUrl: "https://example.com/images/normal-people.jpg"
          },
          {
            id: 136,
            name: "Hamnet",
            category: "book",
            price: 26.95,
            brand: "Knopf",
            imageUrl: "https://example.com/images/hamnet.jpg"
          },
          {
            id: 137,
            name: "Beautiful World, Where Are You",
            category: "book",
            price: 28.00,
            brand: "Farrar, Straus and Giroux",
            imageUrl: "https://example.com/images/beautiful-world.jpg"
          },
          {
            id: 138,
            name: "The Hill We Climb",
            category: "book",
            price: 15.99,
            brand: "Viking",
            imageUrl: "https://example.com/images/hill-we-climb.jpg"
          },
          {
            id: 139,
            name: "It Ends with Us",
            category: "book",
            price: 16.99,
            brand: "Atria Books",
            imageUrl: "https://example.com/images/ends-with-us.jpg"
          },
          {
            id: 140,
            name: "The Anthropocene Reviewed",
            category: "book",
            price: 28.00,
            brand: "Dutton",
            imageUrl: "https://example.com/images/anthropocene-reviewed.jpg"
          },
          {
            id: 141,
            name: "The Song of Achilles",
            category: "book",
            price: 16.99,
            brand: "Ecco",
            imageUrl: "https://example.com/images/song-of-achilles.jpg"
          },
          {
            id: 142,
            name: "On Earth We're Briefly Gorgeous",
            category: "book",
            price: 26.00,
            brand: "Penguin Press",
            imageUrl: "https://example.com/images/briefly-gorgeous.jpg"
          },
          {
            id: 143,
            name: "The Book of Lost Friends",
            category: "book",
            price: 28.00,
            brand: "Ballantine Books",
            imageUrl: "https://example.com/images/lost-friends.jpg"
          },
          {
            id: 144,
            name: "The Giver of Stars",
            category: "book",
            price: 28.00,
            brand: "Pamela Dorman Books",
            imageUrl: "https://example.com/images/giver-of-stars.jpg"
          },
          {
            id: 145,
            name: "Milk and Honey",
            category: "book",
            price: 14.99,
            brand: "Andrews McMeel Publishing",
            imageUrl: "https://example.com/images/milk-and-honey.jpg"
          },
          {
            id: 146,
            name: "The Guest List",
            category: "book",
            price: 26.99,
            brand: "William Morrow",
            imageUrl: "https://example.com/images/guest-list.jpg"
          },
          {
            id: 147,
            name: "The Subtle Art of Not Giving a F*ck",
            category: "book",
            price: 24.99,
            brand: "Harper",
            imageUrl: "https://example.com/images/subtle-art.jpg"
          },
          {
            id: 148,
            name: "The Midnight Library",
            category: "book",
            price: 26.00,
            brand: "Viking",
            imageUrl: "https://example.com/images/midnight-library.jpg"
          },
          {
            id: 149,
            name: "The Thursday Murder Club",
            category: "book",
            price: 26.00,
            brand: "Pamela Dorman Books",
            imageUrl: "https://example.com/images/thursday-murder-club.jpg"
          },
          {
            id: 150,
            name: "The Storyteller",
            category: "book",
            price: 30.00,
            brand: "Dey Street Books",
            imageUrl: "https://example.com/images/storyteller.jpg"
          },
        
          // Photo Frames - 50 items
          {
            id: 151,
            name: "Custom Crystal Photo Frame",
            category: "photo frame",
            price: 85.99,
            brand: "Waterford",
            imageUrl: "https://example.com/images/waterford-crystal-frame.jpg"
          },
          {
            id: 152,
            name: "Silver Plated Engraved Frame",
            category: "photo frame",
            price: 69.99,
            brand: "Tiffany & Co.",
            imageUrl: "https://example.com/images/tiffany-silver-frame.jpg"
          },
          {
            id: 153,
            name: "Personalized Wood Photo Frame",
            category: "photo frame",
            price: 45.99,
            brand: "Pottery Barn",
            imageUrl: "https://example.com/images/pottery-barn-wood-frame.jpg"
          },
          {
            id: 154,
            name: "Digital Photo Frame with WiFi",
            category: "photo frame",
            price: 129.99,
            brand: "Samsung",
            imageUrl: "https://example.com/images/samsung-digital-frame.jpg"
          },
          {
            id: 155,
            name: "Custom Collage Photo Frame",
            category: "photo frame",
            price: 49.99,
            brand: "Crate & Barrel",
            imageUrl: "https://example.com/images/crate-barrel-collage-frame.jpg"
          },
          {
            id: 156,
            name: "Rose Gold Metal Photo Frame",
            category: "photo frame",
            price: 38.99,
            brand: "Kate Spade",
            imageUrl: "https://example.com/images/kate-spade-rose-gold-frame.jpg"
          },
          {
            id: 157,
            name: "Custom Acrylic Photo Block",
            category: "photo frame",
            price: 75.00,
            brand: "Shutterfly",
            imageUrl: "https://example.com/images/shutterfly-acrylic-block.jpg"
          },
          {
            id: 158,
            name: "Personalized Anniversary Frame",
            category: "photo frame",
            price: 65.99,
            brand: "Things Remembered",
            imageUrl: "https://example.com/images/things-remembered-anniversary-frame.jpg"
          },
          {
            id: 159,
            name: "Custom Metal Photo Puzzle",
            category: "photo frame",
            price: 39.99,
            brand: "Uncommon Goods",
            imageUrl: "https://example.com/images/uncommon-goods-photo-puzzle.jpg"
          },
          {
            id: 160,
            name: "Glass LED Light Photo Frame",
            category: "photo frame",
            price: 49.99,
            brand: "Philips",
            imageUrl: "https://example.com/images/philips-led-frame.jpg"
          },
          {
            id: 161,
            name: "Custom Photo Canvas Print",
            category: "photo frame",
            price: 59.99,
            brand: "Artifact Uprising",
            imageUrl: "https://example.com/images/artifact-uprising-canvas.jpg"
          },
          {
            id: 162,
            name: "Personalized Wedding Photo Frame",
            category: "photo frame",
            price: 85.00,
            brand: "Vera Wang",
            imageUrl: "https://example.com/images/vera-wang-wedding-frame.jpg"
          },
          {
            id: 163,
            name: "Custom 3D Crystal Photo Cube",
            category: "photo frame",
            price: 99.99,
            brand: "Swarovski",
            imageUrl: "https://example.com/images/swarovski-crystal-cube.jpg"
          },
          {
            id: 164,
            name: "Customized Bamboo Photo Frame",
            category: "photo frame",
            price: 42.99,
            brand: "West Elm",
            imageUrl: "https://example.com/images/west-elm-bamboo-frame.jpg"
          },
          {
            id: 165,
            name: "Personalized Baby Handprint Frame",
            category: "photo frame",
            price: 45.00,
            brand: "Pottery Barn Kids",
            imageUrl: "https://example.com/images/pottery-barn-kids-handprint-frame.jpg"
          },
          {
            id: 166,
            name: "Custom Leather Photo Album",
            category: "photo frame",
            price: 89.99,
            brand: "Coach",
            imageUrl: "https://example.com/images/coach-leather-album.jpg"
          },
          {
            id: 167,
            name: "Personalized Wall Gallery Frame Set",
            category: "photo frame",
            price: 129.99,
            brand: "Restoration Hardware",
            imageUrl: "https://example.com/images/restoration-hardware-gallery-set.jpg"
          },
          {
            id: 168,
            name: "Custom Metal Photo Ornament",
            category: "photo frame",
            price: 29.99,
            brand: "Hallmark",
            imageUrl: "https://example.com/images/hallmark-photo-ornament.jpg"
          },
          {
            id: 169,
            name: "Customized Travel Photo Book",
            category: "photo frame",
            price: 55.00,
            brand: "Moleskine",
            imageUrl: "https://example.com/images/moleskine-photo-book.jpg"
          },
          {
            id: 170,
            name: "Personalized Photo Keychain",
            category: "photo frame",
            price: 25.99,
            brand: "Michael Kors",
            imageUrl: "https://example.com/images/michael-kors-photo-keychain.jpg"
          },
          {
            id: 171,
            name: "Custom Desk Calendar with Photos",
            category: "photo frame",
            price: 29.99,
            brand: "Minted",
            imageUrl: "https://example.com/images/minted-desk-calendar.jpg"
          },
          {
            id: 172,
            name: "Personalized Floating Frame",
            category: "photo frame",
            price: 59.99,
            brand: "CB2",
            imageUrl: "https://example.com/images/cb2-floating-frame.jpg"
          },
          {
            id: 173,
            name: "Custom Photo Puzzle",
            category: "photo frame",
            price: 34.99,
            brand: "Ravensburger",
            imageUrl: "https://example.com/images/ravensburger-photo-puzzle.jpg"
          },
          {
            id: 174,
            name: "Personalized Photo Wallet Card",
            category: "photo frame",
            price: 19.99,
            brand: "Fossil",
            imageUrl: "https://example.com/images/fossil-photo-wallet-card.jpg"
          },
          {
            id: 175,
            name: "Custom Photo Snow Globe",
            category: "photo frame",
            price: 45.00,
            brand: "Things Remembered",
            imageUrl: "https://example.com/images/things-remembered-snow-globe.jpg"
          },
          {
            id: 176,
            name: "Personalized Photo Clock",
            category: "photo frame",
            price: 69.99,
            brand: "Howard Miller",
            imageUrl: "https://example.com/images/howard-miller-photo-clock.jpg"
          },
          {
            id: 177,
            name: "Custom Photo Blanket",
            category: "photo frame",
            price: 79.99,
            brand: "Pendleton",
            imageUrl: "https://example.com/images/pendleton-photo-blanket.jpg"
          },
          {
            id: 178,
            name: "Personalized Photo Coasters",
            category: "photo frame",
            price: 39.99,
            brand: "Williams Sonoma",
            imageUrl: "https://example.com/images/williams-sonoma-photo-coasters.jpg"
          },
          {
            id: 179,
            name: "Custom Photo Mug",
            category: "photo frame",
            price: 24.99,
            brand: "Lenox",
            imageUrl: "https://example.com/images/lenox-photo-mug.jpg"
          },
          {
            id: 180,
            name: "Personalized Photo Locket Necklace",
            category: "photo frame",
            price: 89.99,
            brand: "Tiffany & Co.",
            imageUrl: "https://example.com/images/tiffany-locket-necklace.jpg"
          },
          {
            id: 181,
            name: "Custom Photo Cushion Cover",
            category: "photo frame",
            price: 35.99,
            brand: "Pottery Barn",
            imageUrl: "https://example.com/images/pottery-barn-cushion-cover.jpg"
          },
          {
            id: 182,
            name: "Personalized Photo Calendar",
            category: "photo frame",
            price: 29.99,
            brand: "Snapfish",
            imageUrl: "https://example.com/images/snapfish-calendar.jpg"
          },
          {
            id: 183,
            name: "Custom Photo Phone Case",
            category: "photo frame",
            price: 39.99,
            brand: "OtterBox",
            imageUrl: "https://example.com/images/otterbox-photo-case.jpg"
          },
          {
            id: 184,
            name: "Personalized Photo Lamp",
            category: "photo frame",
            price: 79.99,
            brand: "Pottery Barn",
            imageUrl: "https://example.com/images/pottery-barn-photo-lamp.jpg"
          },
          {
            id: 185,
            name: "Custom Photo Wine Label",
            category: "photo frame",
            price: 24.99,
            brand: "Personalization Mall",
            imageUrl: "https://example.com/images/personalization-mall-wine-label.jpg"
          },
          {
            id: 186,
            name: "Personalized Photo Watch",
            category: "photo frame",
            price: 99.99,
            brand: "Fossil",
            imageUrl: "https://example.com/images/fossil-photo-watch.jpg"
          },
          {
            id: 187,
            name: "Custom Photo Playing Cards",
            category: "photo frame",
            price: 19.99,
            brand: "Shutterfly",
            imageUrl: "https://example.com/images/shutterfly-playing-cards.jpg"
          },
          {
            id: 188,
            name: "Personalized Photo Water Bottle",
            category: "photo frame",
            price: 29.99,
            brand: "Yeti",
            imageUrl: "https://example.com/images/yeti-photo-bottle.jpg"
          },
          {
            id: 189,
            name: "Custom Photo Cutting Board",
            category: "photo frame",
            price: 49.99,
            brand: "Williams Sonoma",
            imageUrl: "https://example.com/images/williams-sonoma-cutting-board.jpg"
          },
          {
            id: 190,
            name: "Personalized Photo Door Mat",
            category: "photo frame",
            price: 39.99,
            brand: "Crate & Barrel",
            imageUrl: "https://example.com/images/crate-barrel-door-mat.jpg"
          },
          {
            id: 191,
            name: "Custom Photo Candle",
            category: "photo frame",
            price: 34.99,
            brand: "Yankee Candle",
            imageUrl: "https://example.com/images/yankee-candle-photo-candle.jpg"
          },
          {
            id: 192,
            name: "Personalized Photo Tote Bag",
            category: "photo frame",
            price: 45.00,
            brand: "Longchamp",
            imageUrl: "https://example.com/images/longchamp-photo-tote.jpg"
          },
          {
            id: 193,
            name: "Custom Photo Wallet",
            category: "photo frame",
            price: 59.99,
            brand: "Coach",
            imageUrl: "https://example.com/images/coach-photo-wallet.jpg"
          },
          {
            id: 194,
            name: "Personalized Photo Apron",
            category: "photo frame",
            price: 29.99,
            brand: "Williams Sonoma",
            imageUrl: "https://example.com/images/williams-sonoma-photo-apron.jpg"
          },
          {
            id: 195,
            name: "Custom Photo Mouse Pad",
            category: "photo frame",
            price: 19.99,
            brand: "Shutterfly",
            imageUrl: "https://example.com/images/shutterfly-mouse-pad.jpg"
          },
          {
            id: 196,
            name: "Personalized Photo Slate",
            category: "photo frame",
            price: 44.99,
            brand: "Uncommon Goods",
            imageUrl: "https://example.com/images/uncommon-goods-photo-slate.jpg"
          },
          {
            id: 197,
            name: "Custom Photo Jewelry Box",
            category: "photo frame",
            price: 69.99,
            brand: "Pottery Barn",
            imageUrl: "https://example.com/images/pottery-barn-jewelry-box.jpg"
          },
          {
            id: 198,
            name: "Personalized Photo T-Shirt",
            category: "photo frame",
            price: 29.99,
            brand: "Custom Ink",
            imageUrl: "https://example.com/images/custom-ink-tshirt.jpg"
          },
          {
            id: 199,
            name: "Custom Photo Engraved Pen",
            category: "photo frame",
            price: 49.99,
            brand: "Cross",
            imageUrl: "https://example.com/images/cross-engraved-pen.jpg"
          },
          {
            id: 200,
            name: "Personalized Photo Wall Clock",
            category: "photo frame",
            price: 59.99,
            brand: "Howard Miller",
            imageUrl: "https://example.com/images/howard-miller-wall-clock.jpg"
          },
        
          // Cosmetics - 50 items
          {
            id: 201,
            name: "Rouge Allure Lipstick",
            category: "cosmetic",
            price: 45.00,
            brand: "Chanel",
            imageUrl: "https://example.com/images/chanel-rouge-allure.jpg"
          },
          {
            id: 202,
            name: "Double Wear Foundation",
            category: "cosmetic",
            price: 48.00,
            brand: "Estée Lauder",
            imageUrl: "https://example.com/images/estee-lauder-double-wear.jpg"
          },
          {
            id: 203,
            name: "Advanced Night Repair Serum",
            category: "cosmetic",
            price: 75.00,
            brand: "Estée Lauder",
            imageUrl: "https://example.com/images/estee-lauder-night-repair.jpg"
          },
          {
            id: 204,
            name: "Touche Éclat Concealer",
            category: "cosmetic",
            price: 38.00,
            brand: "Yves Saint Laurent",
            imageUrl: "https://example.com/images/ysl-touche-eclat.jpg"
          },
          {
            id: 205,
            name: "Lip Glow Oil",
            category: "cosmetic",
            price: 38.00,
            brand: "Dior",
            imageUrl: "https://example.com/images/dior-lip-glow-oil.jpg"
          },
          {
            id: 206,
            name: "La Mer Moisturizing Cream",
            category: "cosmetic",
            price: 190.00,
            brand: "La Mer",
            imageUrl: "https://example.com/images/la-mer-cream.jpg"
          },
          {
            id: 207,
            name: "Naked Eyeshadow Palette",
            category: "cosmetic",
            price: 54.00,
            brand: "Urban Decay",
            imageUrl: "https://example.com/images/urban-decay-naked-palette.jpg"
          },
          {
            id: 208,
            name: "Better Than Sex Mascara",
            category: "cosmetic",
            price: 28.00,
            brand: "Too Faced",
            imageUrl: "https://example.com/images/too-faced-mascara.jpg"
          },
          {
            id: 209,
            name: "Pillow Talk Lipstick",
            category: "cosmetic",
            price: 34.00,
            brand: "Charlotte Tilbury",
            imageUrl: "https://example.com/images/charlotte-tilbury-pillow-talk.jpg"
          },
          {
            id: 210,
            name: "Luminous Silk Foundation",
            category: "cosmetic",
            price: 64.00,
            brand: "Giorgio Armani",
            imageUrl: "https://example.com/images/armani-luminous-silk.jpg"
          },
          {
            id: 211,
            name: "Crème de la Mer",
            category: "cosmetic",
            price: 190.00,
            brand: "La Mer",
            imageUrl: "https://example.com/images/la-mer-creme.jpg"
          },
          {
            id: 212,
            name: "Shape Tape Concealer",
            category: "cosmetic",
            price: 29.00,
            brand: "Tarte",
            imageUrl: "https://example.com/images/tarte-shape-tape.jpg"
          },
          {
            id: 213,
            name: "Benefit Hoola Bronzer",
            category: "cosmetic",
            price: 32.00,
            brand: "Benefit",
            imageUrl: "https://example.com/images/benefit-hoola.jpg"
          },
          {
            id: 214,
            name: "Subculture Eyeshadow Palette",
            category: "cosmetic",
            price: 45.00,
            brand: "Anastasia Beverly Hills",
            imageUrl: "https://example.com/images/anastasia-subculture.jpg"
          },
          {
            id: 215,
            name: "Beauty Blender Sponge",
            category: "cosmetic",
            price: 20.00,
            brand: "Beauty Blender",
            imageUrl: "https://example.com/images/beauty-blender.jpg"
          },
          {
            id: 216,
            name: "Killawatt Highlighter",
            category: "cosmetic",
            price: 36.00,
            brand: "Fenty Beauty",
          }
]