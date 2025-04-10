
# Shopping Cart App

A simple React Native application that simulates a shopping cart experience, allowing users to browse products, add them to a cart, increase or decrease the quantity, and proceed with checkout. The app leverages React Context for state management and uses navigation for a smooth user experience.

## Features

- **Product List**: View a list of available products with their details such as name, price, and image.
- **Add to Cart**: Add products to the cart with quantity management (increase/decrease).
- **Cart Management**: View the cart, modify quantities, remove items, and see the total cost.
- **Checkout**: Complete the purchase by placing an order, clearing the cart, and navigating back to the products list.

## Screens

- **Product List Screen**: Displays a list of products with the option to add them to the cart. The user can also navigate to the cart screen.
- **Cart Screen**: Displays items added to the cart, their quantities, and allows the user to proceed to checkout or continue shopping.

## Technologies Used

- **React Native**: Framework for building mobile applications.
- **React Navigation**: Handles navigation between screens in the app.
- **React Context API**: Manages global state (cart contents) across the app.
- **React Native Components**: Uses built-in components such as `FlatList`, `View`, `TouchableOpacity`, `Text`, `Image`, etc.

## Installation

Follow the steps below to set up the project:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mangesh-sakordekar/ShoppingCart.git
    cd ShoppingCart
    ```

2. **Install dependencies**:
    Make sure you have Node.js installed. Then, install the required dependencies using:
    ```bash
    npm install
    ```

3. **Run the app**:
    If you're using Expo, you can run the app with:
    ```bash
    npx expo start
    ```
    This will start the app in your default browser, and you can use the Expo Go app on your device or emulator to see the app.

## File Structure

- **/components**: Contains reusable components such as `CartItem` and `ProductItem`.
- **/context**: Manages global state with `CartContext` for cart actions.
- **/screens**: Contains the screens for the app, including `ProductListScreen` and `CartScreen`.
- **App.js**: The entry point for the app, where navigation is set up, and global state is provided.

## Code Overview

1. **CartContext.js**: Implements the context and reducer to handle cart state (add, remove, update quantities).
2. **ProductListScreen.js**: Displays the list of products, with options to add products to the cart.
3. **CartScreen.js**: Displays the cart items and allows users to modify quantities, remove items, and checkout.
4. **ProductItem.js**: Displays product details and controls for adding/removing items from the cart.
5. **CartItem.js**: Displays cart items with controls to adjust quantity and remove items.
6. **App.js**: Main entry point of the app, configuring the navigation stack and wrapping the app with `CartProvider`.

## How to Use

1. **Browse Products**: On the product list screen, tap the "Add to Cart" button to add items to the cart.
2. **View Cart**: Tap the cart icon to go to the cart screen, where you can modify the quantities or remove items.
3. **Checkout**: Click the "Checkout" button to complete the purchase, which clears the cart and shows a success message.
4. **Continue Shopping**: Use the "Shop More" button to navigate back to the product list.

## Future Enhancements

- Add product categories and search functionality.
- Implement real-time inventory tracking with a backend.
- Add user authentication to manage personalized cart data.
- Improve UI with animations and transitions.

## License

This project is open source and available under the MIT License.
