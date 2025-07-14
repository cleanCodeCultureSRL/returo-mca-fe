import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Transaction {
  id: string;
  type: "scan" | "transfer" | "donation" | "voucher" | "reward" | "challenge";
  amount: number;
  description: string;
  timestamp: string;
  status: "pending" | "completed" | "failed";
  metadata?: {
    recipientId?: string;
    recipientName?: string;
    receiptId?: string;
    challengeId?: string;
    voucherId?: string;
    organizationId?: string;
    retailer?: string;
  };
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  value: number;
  type: "discount" | "cashback" | "free_item";
  retailer: string;
  expiresAt: string;
  isUsed: boolean;
  usedAt?: string;
  code: string;
  terms?: string;
  image?: string;
}

export interface WalletStats {
  totalEarned: number;
  totalSpent: number;
  totalDonated: number;
  receiptsScanned: number;
  challengesCompleted: number;
  vouchersEarned: number;
  carbonFootprintSaved: number; // kg CO2
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
  vouchers: Voucher[];
  stats: WalletStats;
  isLoading: boolean;
  error: string | null;
  isTransactionLoading: boolean;
  transactionError: string | null;
}

// Initial state
const initialState: WalletState = {
  balance: 0,
  transactions: [],
  vouchers: [],
  stats: {
    totalEarned: 0,
    totalSpent: 0,
    totalDonated: 0,
    receiptsScanned: 0,
    challengesCompleted: 0,
    vouchersEarned: 0,
    carbonFootprintSaved: 0,
  },
  isLoading: false,
  error: null,
  isTransactionLoading: false,
  transactionError: null,
};

// Local storage helpers
const WALLET_STORAGE_KEY = "returo_wallet";

const saveWalletToStorage = (walletData: Partial<WalletState>) => {
  if (typeof window !== "undefined") {
    const currentData = localStorage.getItem(WALLET_STORAGE_KEY);
    const existing = currentData ? JSON.parse(currentData) : {};
    localStorage.setItem(
      WALLET_STORAGE_KEY,
      JSON.stringify({ ...existing, ...walletData })
    );
  }
};

const loadWalletFromStorage = (): Partial<WalletState> | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(WALLET_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

// Mock data
const mockVouchers: Voucher[] = [
  {
    id: "voucher_1",
    title: "20% Reducere Mega Image",
    description: "Discount 20% la cumpărăturile peste 100 RON",
    value: 20,
    type: "discount",
    retailer: "Mega Image",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isUsed: false,
    code: "MEGA20OFF",
    terms: "Valabil pentru cumpărături peste 100 RON",
    image: "/logos/mega-image-logo.png",
  },
  {
    id: "voucher_2",
    title: "Voucher 50 RON Kaufland",
    description: "Voucher în valoare de 50 RON",
    value: 50,
    type: "cashback",
    retailer: "Kaufland",
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    isUsed: false,
    code: "KAUFLAND50",
    terms: "Valabil pentru orice cumpărătură",
    image: "/logos/kaufland-logo.png",
  },
];

// Async thunks
export const loadWallet = createAsyncThunk(
  "wallet/loadWallet",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const savedWallet = loadWalletFromStorage();

      if (savedWallet) {
        return savedWallet;
      }

      // Initialize with mock data
      const initialData = {
        balance: 265.5,
        transactions: [
          {
            id: "tx_1",
            type: "scan" as const,
            amount: 12.5,
            description: "Bon scanat - Mega Image",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: "completed" as const,
            metadata: { receiptId: "receipt_1", retailer: "Mega Image" },
          },
          {
            id: "tx_2",
            type: "challenge" as const,
            amount: 25.0,
            description: "Provocare completată - Reciclare 100 PET",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            status: "completed" as const,
            metadata: { challengeId: "challenge_1" },
          },
        ],
        vouchers: mockVouchers,
        stats: {
          totalEarned: 1250.75,
          totalSpent: 450.25,
          totalDonated: 200.0,
          receiptsScanned: 87,
          challengesCompleted: 12,
          vouchersEarned: 15,
          carbonFootprintSaved: 45.6,
        },
      };

      saveWalletToStorage(initialData);
      return initialData;
    } catch {
      return rejectWithValue("Failed to load wallet");
    }
  }
);

export const scanReceipt = createAsyncThunk(
  "wallet/scanReceipt",
  async (
    {
      receiptData,
    }: { receiptData: { retailer: string; amount: number; items: string[] } },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const points = Math.floor(receiptData.amount * 0.1); // 10% of amount as points

      const transaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: "scan",
        amount: points,
        description: `Bon scanat - ${receiptData.retailer}`,
        timestamp: new Date().toISOString(),
        status: "completed",
        metadata: {
          receiptId: `receipt_${Date.now()}`,
          retailer: receiptData.retailer,
        },
      };

      return { transaction, points };
    } catch {
      return rejectWithValue("Failed to scan receipt");
    }
  }
);

export const transferMoney = createAsyncThunk(
  "wallet/transferMoney",
  async (
    {
      amount,
      recipientId,
      recipientName,
    }: { amount: number; recipientId: string; recipientName: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { wallet: WalletState };

      if (state.wallet.balance < amount) {
        return rejectWithValue("Insufficient balance");
      }

      // Simulate API processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const transaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: "transfer",
        amount: -amount,
        description: `Transfer către ${recipientName}`,
        timestamp: new Date().toISOString(),
        status: "completed",
        metadata: {
          recipientId,
          recipientName,
        },
      };

      return { transaction, amount };
    } catch {
      return rejectWithValue("Failed to transfer money");
    }
  }
);

export const donateToOrganization = createAsyncThunk(
  "wallet/donateToOrganization",
  async (
    {
      amount,
      organizationId,
      organizationName,
    }: { amount: number; organizationId: string; organizationName: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { wallet: WalletState };

      if (state.wallet.balance < amount) {
        return rejectWithValue("Insufficient balance");
      }

      // Simulate API processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const transaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: "donation",
        amount: -amount,
        description: `Donație către ${organizationName}`,
        timestamp: new Date().toISOString(),
        status: "completed",
        metadata: {
          organizationId,
          recipientName: organizationName,
        },
      };

      return { transaction, amount };
    } catch {
      return rejectWithValue("Failed to donate");
    }
  }
);

export const useVoucher = createAsyncThunk(
  "wallet/useVoucher",
  async (voucherId: string, { rejectWithValue }) => {
    try {
      // Simulate API processing
      await new Promise((resolve) => setTimeout(resolve, 800));

      return voucherId;
    } catch {
      return rejectWithValue("Failed to use voucher");
    }
  }
);

export const completeChallenge = createAsyncThunk(
  "wallet/completeChallenge",
  async (
    { challengeId, reward }: { challengeId: string; reward: number },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API processing
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const transaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: "challenge",
        amount: reward,
        description: `Provocare completată - Recompensă ${reward} RON`,
        timestamp: new Date().toISOString(),
        status: "completed",
        metadata: {
          challengeId,
        },
      };

      return { transaction, reward };
    } catch {
      return rejectWithValue("Failed to complete challenge");
    }
  }
);

// Slice
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.transactionError = null;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      // Update balance
      state.balance += action.payload.amount;
      // Update stats
      if (action.payload.amount > 0) {
        state.stats.totalEarned += action.payload.amount;
      } else {
        state.stats.totalSpent += Math.abs(action.payload.amount);
      }
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    addVoucher: (state, action: PayloadAction<Voucher>) => {
      state.vouchers.push(action.payload);
      state.stats.vouchersEarned += 1;
    },
    updateStats: (state, action: PayloadAction<Partial<WalletStats>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Load wallet
      .addCase(loadWallet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance || 0;
        state.transactions = action.payload.transactions || [];
        state.vouchers = action.payload.vouchers || [];
        state.stats = action.payload.stats || initialState.stats;
        state.error = null;
      })
      .addCase(loadWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Scan receipt
      .addCase(scanReceipt.pending, (state) => {
        state.isTransactionLoading = true;
        state.transactionError = null;
      })
      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.isTransactionLoading = false;
        state.transactions.unshift(action.payload.transaction);
        state.balance += action.payload.points;
        state.stats.totalEarned += action.payload.points;
        state.stats.receiptsScanned += 1;
        state.stats.carbonFootprintSaved += 0.5; // 500g CO2 saved per receipt
        saveWalletToStorage({
          balance: state.balance,
          transactions: state.transactions,
          stats: state.stats,
        });
      })
      .addCase(scanReceipt.rejected, (state, action) => {
        state.isTransactionLoading = false;
        state.transactionError = action.payload as string;
      })
      // Transfer money
      .addCase(transferMoney.pending, (state) => {
        state.isTransactionLoading = true;
        state.transactionError = null;
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        state.isTransactionLoading = false;
        state.transactions.unshift(action.payload.transaction);
        state.balance -= action.payload.amount;
        state.stats.totalSpent += action.payload.amount;
        saveWalletToStorage({
          balance: state.balance,
          transactions: state.transactions,
          stats: state.stats,
        });
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.isTransactionLoading = false;
        state.transactionError = action.payload as string;
      })
      // Donate to organization
      .addCase(donateToOrganization.pending, (state) => {
        state.isTransactionLoading = true;
        state.transactionError = null;
      })
      .addCase(donateToOrganization.fulfilled, (state, action) => {
        state.isTransactionLoading = false;
        state.transactions.unshift(action.payload.transaction);
        state.balance -= action.payload.amount;
        state.stats.totalDonated += action.payload.amount;
        saveWalletToStorage({
          balance: state.balance,
          transactions: state.transactions,
          stats: state.stats,
        });
      })
      .addCase(donateToOrganization.rejected, (state, action) => {
        state.isTransactionLoading = false;
        state.transactionError = action.payload as string;
      })
      // Use voucher
      .addCase(useVoucher.fulfilled, (state, action) => {
        const voucherIndex = state.vouchers.findIndex(
          (v) => v.id === action.payload
        );
        if (voucherIndex !== -1) {
          state.vouchers[voucherIndex].isUsed = true;
          state.vouchers[voucherIndex].usedAt = new Date().toISOString();
        }
        saveWalletToStorage({ vouchers: state.vouchers });
      })
      .addCase(useVoucher.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Complete challenge
      .addCase(completeChallenge.pending, (state) => {
        state.isTransactionLoading = true;
        state.transactionError = null;
      })
      .addCase(completeChallenge.fulfilled, (state, action) => {
        state.isTransactionLoading = false;
        state.transactions.unshift(action.payload.transaction);
        state.balance += action.payload.reward;
        state.stats.totalEarned += action.payload.reward;
        state.stats.challengesCompleted += 1;
        saveWalletToStorage({
          balance: state.balance,
          transactions: state.transactions,
          stats: state.stats,
        });
      })
      .addCase(completeChallenge.rejected, (state, action) => {
        state.isTransactionLoading = false;
        state.transactionError = action.payload as string;
      });
  },
});

export const {
  clearError,
  addTransaction,
  updateBalance,
  addVoucher,
  updateStats,
} = walletSlice.actions;

export default walletSlice.reducer;
