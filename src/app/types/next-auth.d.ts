declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string | null;
      username: string;
      username_secondary: string | null;
      company_id: number;
      phone: string | null;
      is_active: boolean;
      is_approved: boolean;
      is_lock: boolean;
      is_default_user: boolean;
      is_temporary_password: boolean;
      created_at: Date;
      updated_at: Date | null;
    };
  }
  interface User {
    id: string;
    email: string | null;
    username: string;
    username_secondary: string | null;
    company_id: number;
    phone: string | null;
    is_active: boolean;
    is_approved: boolean;
    is_lock: boolean;
    is_default_user: boolean;
    is_temporary_password: boolean;
    created_at: Date;
    updated_at: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string | null;
      username: string;
      username_secondary: string | null;
      company_id: number;
      phone: string | null;
      is_active: boolean;
      is_approved: boolean;
      is_lock: boolean;
      is_default_user: boolean;
      is_temporary_password: boolean;
      created_at: Date;
      updated_at: Date | null;
    };
  }
}
