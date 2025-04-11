// import React, { useState, useEffect } from 'react';
// import './GiftIdeas.css'; // Separate CSS file

// const GiftIdeas = () => {
//   const [gifts, setGifts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGiftIdeas = async () => {
//       try {
//         const response = await fetch(
//           'https://run.mocky.io/v3/4eadaa11-1478-4dd0-80fb-55a164d38f18'
//         );
//         if (!response.ok) {
//           throw new Error('Failed to fetch gift ideas');
//         }
//         const data = await response.json();
//         setGifts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGiftIdeas();
//   }, []);

//   const handleAddToList = (giftId) => {
//     // Implement your add to list logic here
//     console.log(`Added gift ${giftId} to list`);
//     alert(`Added gift ${giftId} to your wishlist!`);
//   };

//   if (loading) return <div className="loading">Loading gift ideas...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="gift-ideas-container">
//       <h1>Gift Ideas</h1>
//       <div className="gifts-grid">
//         {gifts.map((gift) => (
//           <div key={gift.id} className="gift-card">
//             <img src={gift.image} alt={gift.name} className="gift-image" />
//             <div className="gift-details">
//               <h3>{gift.name}</h3>
//               <p>{gift.description}</p>
//               <p className="gift-price">${gift.price}</p>
//               <button
//                 onClick={() => handleAddToList(gift.id)}
//                 className="add-to-list-btn"
//               >
//                 Add to List
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GiftIdeas;

import React, { useState, useEffect } from 'react';
import { db, ref, onValue } from '../../firebaseconfig';
import './giftideas.css';

const GiftIdeas = () => {

  const [gifts, setGifts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const giftsRef = ref(db, 'gifts');
    
    const unsubscribe = onValue(giftsRef, (snapshot) => {
      try {
        setLoading(true);
        const giftsData = snapshot.val();
        
        // Convert Firebase object to array
        const giftsArray = giftsData 
          ? Object.keys(giftsData).map(key => ({
              id: key,
              ...giftsData[key]
            }))
          : []; // Fallback to empty array if no data

        setGifts(giftsArray);
        setError(null);
      } catch (err) {
        console.error("Error processing gifts:", err);
        setError("Failed to load gifts");
        setGifts([]); // Ensure gifts is always an array
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading">Loading gifts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gift-ideas-container">
      <h1>Gift Ideas</h1>
      
      {gifts.length > 0 ? (
        <div className="gifts-grid">
          {gifts.map((gift) => (
            <div key={gift.id} className="gift-card">
              <img 
                src={gift.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={gift.name} 
                className="gift-image" 
              />
              <div className="gift-details">
                <h3>{gift.name}</h3>
                <p>{gift.description}</p>
                <p className="gift-price">${parseFloat(gift.price || 0).toFixed(2)}</p>
                <button
                  onClick={() => handleAddToList(gift.id)}
                  className="add-to-list-btn"
                >
                  Add to List
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-gifts">No gifts available yet.</p>
      )}
    </div>
  );
};

export default GiftIdeas;





// import React, { useState, useEffect } from 'react';
// import { db, ref, push, onValue } from './firebaseConfig';
// import './giftideas.css';

// const GiftIdeas=() => {
//   const [gifts, setGifts] = useState([]);
//   const [newGift, setNewGift] = useState({
//     name: '',
//     description: '',
//     price: '',
//     imageUrl: ''
//   });

//   // Fetch gifts in real-time
//   useEffect(() => {
//     const giftsRef = ref(db, 'gifts');
    
//     const unsubscribe = onValue(giftsRef, (snapshot) => {
//       const giftsData = snapshot.val();
//       if (giftsData) {
//         const giftsList = Object.keys(giftsData).map(key => ({
//           id: key,
//           ...giftsData[key]
//         }));
//         setGifts(giftsList);
//       } else {
//         setGifts([]);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleAddToList = (giftId) => {
//     // Add to user's wishlist (separate Firebase path)
//     const wishlistRef = ref(db, `wishlists/${user.uid}/${giftId}`);
//     push(wishlistRef, { addedAt: Date.now() })
//       .then(() => alert('Added to your wishlist!'))
//       .catch(error => console.error('Error:', error));
//   };

//   const handleAddNewGift = (e) => {
//     e.preventDefault();
//     push(ref(db, 'gifts'), newGift)
//       .then(() => setNewGift({
//         name: '',
//         description: '',
//         price: '',
//         imageUrl: ''
//       }))
//       .catch(error => alert('Error adding gift: ' + error.message));
//   };

//   return (
//     <div className="gift-ideas-container">
//       <h1>Gift Ideas</h1>
      
//       {/* Admin Form - Only show to admins */}
//       {user?.isAdmin && (
//         <form onSubmit={handleAddNewGift} className="add-gift-form">
//           <h3>Add New Gift</h3>
//           <input
//             type="text"
//             placeholder="Gift Name"
//             value={newGift.name}
//             onChange={(e) => setNewGift({...newGift, name: e.target.value})}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={newGift.description}
//             onChange={(e) => setNewGift({...newGift, description: e.target.value})}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newGift.price}
//             onChange={(e) => setNewGift({...newGift, price: e.target.value})}
//             required
//           />
//           <input
//             type="url"
//             placeholder="Image URL"
//             value={newGift.imageUrl}
//             onChange={(e) => setNewGift({...newGift, imageUrl: e.target.value})}
//             required
//           />
//           <button type="submit">Add Gift</button>
//         </form>
//       )}

//       <div className="gifts-grid">
//         {gifts.map((gift) => (
//           <div key={gift.id} className="gift-card">
//             <img src={gift.imageUrl} alt={gift.name} className="gift-image" />
//             <div className="gift-details">
//               <h3>{gift.name}</h3>
//               <p>{gift.description}</p>
//               <p className="gift-price">${parseFloat(gift.price).toFixed(2)}</p>
//               <button
//                 onClick={() => handleAddToList(gift.id)}
//                 className="add-to-list-btn"
//               >
//                 Add to List
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GiftIdeas;


