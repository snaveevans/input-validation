export const mockDelay = (ms: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  await mockDelay(800);
  const unavailableUsernames = ['admin', 'user', 'test', 'john', 'jane'];
  return !unavailableUsernames.includes(username.toLowerCase());
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  await mockDelay(600);
  const existingEmails = ['test@example.com', 'admin@example.com', 'user@test.com'];
  return existingEmails.includes(email.toLowerCase());
};

export const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; url?: string; error?: string }> => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Invalid file type' };
  }

  if (file.size > maxSize) {
    return { success: false, error: 'File too large (max 5MB)' };
  }

  for (let i = 0; i <= 100; i += 10) {
    await mockDelay(100);
    onProgress?.(i);
  }

  return {
    success: true,
    url: `https://example.com/files/${file.name}`
  };
};

export const validateCouponCode = async (code: string): Promise<{ valid: boolean; discount?: number }> => {
  await mockDelay(700);
  const validCoupons: Record<string, number> = {
    'SAVE10': 10,
    'SAVE20': 20,
    'WELCOME': 15
  };

  const discount = validCoupons[code.toUpperCase()];
  return {
    valid: !!discount,
    discount
  };
};

export const fetchCountries = async (): Promise<string[]> => {
  await mockDelay(500);
  return ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan'];
};

export const fetchCitiesByCountry = async (country: string): Promise<string[]> => {
  await mockDelay(500);
  const cities: Record<string, string[]> = {
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh']
  };
  return cities[country] || [];
};
