export const generateEmailHtml = (items) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Shared Wishlist</h2>
        ${items
          .map(
            (item) => `
          <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; border-radius: 8px;">
            <img src="${item.imageUrl}" alt="${item.name}" style="width: 100px; height: auto; float: left; margin-right: 10px;"/>
            <div style="overflow: hidden;">
              <h3 style="margin: 0;">${item.name}</h3>
              <p style="margin: 5px 0;"><strong>Price:</strong> ₹${item.price}</p>
              ${item.brand ? `<p style="margin: 5px 0;"><strong>Brand:</strong> ${item.brand}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Category:</strong> ${item.category}</p>
              ${
                item.description
                  ? `<p style="margin: 5px 0;"><strong>Description:</strong> ${item.description}</p>`
                  : ''
              }
            </div>
            <div style="clear: both;"></div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  };
  