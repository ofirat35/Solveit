export const queryKeys = {
  categories: {
    all: ["categories"],
    categoriesWithSubcategories: ["categoriesWithSubcategories"],
    subcategories: (categoryId: number) => ["subcategories", categoryId],
  },
  orders: {
    myOrders: ["myOrders"],
    details: (orderId: string) => ["orderDetails", orderId],
  },
  users: {
    getById: (userId: string) => ["user", userId],
    images: (userId: string) => ["userImage", userId],
  },
  services: {
    getById: (serviceId: number) => ["service", serviceId],
    serviceApplications: (serviceId: number) => [
      "serviceApplications",
      serviceId,
    ],
    serviceProvidersBySubcategory: (subcategoryId: number) => [
      "serviceProviders",
      subcategoryId,
    ],
    userServices: (userId: string) => ["userServices", userId],
  },
  //   servicesByCategory: (categoryId: number) => [
  //     "servicesByCategory",
  //     categoryId,
  //   ],
  serviceDetails: (serviceId: number) => ["serviceDetails", serviceId],
  userProfile: ["userProfile"],
  userServices: (userId: string) => ["userServices", userId],
};
