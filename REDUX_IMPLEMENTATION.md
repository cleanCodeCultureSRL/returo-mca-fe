# Redux Toolkit Implementation

This project now includes a complete Redux Toolkit implementation with three main slices: `authSlice`, `mapSlice`, and `walletSlice`.

## 🚀 Features

### AuthSlice

- Complete authentication flow (login, register, logout)
- Local storage persistence for user data
- Simulated user database using localStorage
- Password validation (simplified for demo)
- User profile management
- Authentication state management

### MapSlice

- Geolocation handling with permissions
- Map markers management (retailers, recycling points, donations)
- Map settings (zoom, center, style)
- Location-based features
- Mock data for demonstration

### WalletSlice

- Balance management
- Transaction history
- Voucher system
- Wallet statistics
- Receipt scanning simulation
- Money transfer functionality
- Donation system
- Challenge completion rewards

## 📁 File Structure

```
src/
├── store/
│   ├── index.ts              # Store configuration
│   ├── hooks.ts              # Typed Redux hooks
│   ├── ReduxProvider.tsx     # Provider component
│   └── slices/
│       ├── authSlice.ts      # Authentication logic
│       ├── mapSlice.ts       # Map-related state
│       └── walletSlice.ts    # Wallet functionality
```

## 🔧 Setup

### 1. Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Provider Setup

The Redux provider is already configured in `src/app/layout.tsx`:

```tsx
import ReduxProvider from "../store/ReduxProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <div className="max-w-md mx-auto bg-white min-h-screen relative">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
```

## 💻 Usage Examples

### Using Auth State

```tsx
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../store/slices/authSlice";

function LoginComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {isAuthenticated && <p>Welcome {user?.firstName}!</p>}
    </div>
  );
}
```

### Using Wallet State

```tsx
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loadWallet,
  scanReceipt,
  transferMoney,
} from "../../store/slices/walletSlice";

function WalletComponent() {
  const dispatch = useAppDispatch();
  const { balance, transactions, isLoading } = useAppSelector(
    (state) => state.wallet
  );

  const handleScanReceipt = async (receiptData) => {
    try {
      await dispatch(scanReceipt({ receiptData })).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Balance: {balance} RON</h2>
      <button onClick={() => handleScanReceipt(receiptData)}>
        Scan Receipt
      </button>
    </div>
  );
}
```

### Using Map State

```tsx
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCurrentLocation,
  loadMarkers,
  setMapCenter,
} from "../../store/slices/mapSlice";

function MapComponent() {
  const dispatch = useAppDispatch();
  const { currentLocation, markers, mapCenter, zoom } = useAppSelector(
    (state) => state.map
  );

  const handleGetLocation = async () => {
    try {
      await dispatch(getCurrentLocation()).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Get My Location</button>
      <p>Markers: {markers.length}</p>
    </div>
  );
}
```

## 🔒 Authentication System

### User Registration

```tsx
const handleRegister = async (userData) => {
  try {
    await dispatch(registerUser(userData)).unwrap();
    // User is automatically logged in after registration
  } catch (error) {
    // Handle registration error
  }
};
```

### User Login

```tsx
const handleLogin = async (credentials) => {
  try {
    await dispatch(loginUser(credentials)).unwrap();
    // User data is stored in localStorage
  } catch (error) {
    // Handle login error
  }
};
```

### Logout

```tsx
const handleLogout = async () => {
  await dispatch(logoutUser());
  // User data is cleared from localStorage
};
```

## 💰 Wallet Operations

### Scan Receipt

```tsx
const receiptData = {
  retailer: "Mega Image",
  amount: 125.5,
  items: ["Milk", "Bread", "Eggs"],
};

dispatch(scanReceipt({ receiptData }));
```

### Transfer Money

```tsx
const transferData = {
  amount: 50,
  recipientId: "user123",
  recipientName: "John Doe",
};

dispatch(transferMoney(transferData));
```

### Make Donation

```tsx
const donationData = {
  amount: 25,
  organizationId: "org123",
  organizationName: "Daruiește Aripi",
};

dispatch(donateToOrganization(donationData));
```

## 🗺️ Map Features

### Get Current Location

```tsx
dispatch(getCurrentLocation());
```

### Load Map Markers

```tsx
dispatch(loadMarkers());
```

### Add Custom Marker

```tsx
const markerData = {
  title: "New Location",
  description: "Custom marker",
  location: { latitude: 44.4268, longitude: 26.1025 },
  type: "user",
};

dispatch(addMarker(markerData));
```

## 🎯 Key Features

### 1. Persistence

- User authentication data is stored in localStorage
- Wallet transactions are persisted
- User database simulation with localStorage

### 2. Error Handling

- All async operations include proper error handling
- Loading states for UI feedback
- Error messages for user feedback

### 3. TypeScript Support

- Full TypeScript integration
- Type-safe Redux hooks
- Strongly typed state and actions

### 4. Realistic Simulation

- API delays to simulate real backend calls
- Realistic user data and transactions
- Mock data for development

## 🧪 Testing the Implementation

### 1. Register a New User

```javascript
// Example registration data
const userData = {
  email: "test@example.com",
  password: "password123",
  firstName: "John",
  lastName: "Doe",
  phone: "0712345678",
};
```

### 2. Login with Existing User

```javascript
// Login with any registered user
const credentials = {
  email: "test@example.com",
  password: "any_password", // Any password works in demo mode
};
```

### 3. Check localStorage

Open browser DevTools → Application → Local Storage to see:

- `returo_auth`: Current user and token
- `returo_users`: All registered users
- `returo_wallet`: Wallet data and transactions

## 🛠️ Development Tips

1. **Use the typed hooks**: Always use `useAppDispatch` and `useAppSelector` instead of the raw Redux hooks
2. **Handle async operations**: Use `.unwrap()` to handle promise resolution/rejection
3. **Clear errors**: Dispatch `clearError()` when appropriate
4. **Check loading states**: Use loading states to show appropriate UI feedback
5. **Persist important data**: The system automatically handles localStorage persistence

## 📝 Example Component

Check `src/app/components/AuthStatus.tsx` for a complete example of how to use multiple slices together.

## 🔄 Migration from Local State

To migrate existing components to use Redux:

1. Replace `useState` with `useAppSelector`
2. Replace direct state updates with `dispatch` calls
3. Add loading and error handling
4. Use the typed hooks for better TypeScript support

## 🎨 Integration with UI

The Redux implementation is designed to work seamlessly with your existing UI components. The login page (`src/app/login/page.tsx`) has been updated as an example of how to integrate Redux with your forms.

This implementation provides a solid foundation for a production-ready app with proper state management, persistence, and error handling.
