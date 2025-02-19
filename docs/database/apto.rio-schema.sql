-- Enable Row Level Security for all tables and create appropriate policies
-- This script implements RLS based on user roles and ownership patterns

-- 1. Enable RLS on all tables
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 2. Create necessary helper functions for authentication checks
CREATE OR REPLACE FUNCTION public.get_auth_user_id()
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.uid()
$$;

-- 3. Create policies for each table

-- PRICING PLANS - Visible to all, modifiable by service_role
CREATE POLICY "Pricing plans are viewable by everyone"
  ON public.pricing_plans
  FOR SELECT
  USING (true);

CREATE POLICY "Pricing plans are modifiable by service_role only"
  ON public.pricing_plans
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- PRICING FEATURES - Visible to all, modifiable by service_role 
CREATE POLICY "Pricing features are viewable by everyone"
  ON public.pricing_features
  FOR SELECT
  USING (true);

CREATE POLICY "Pricing features are modifiable by service_role only"
  ON public.pricing_features
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- PROFILES - Users can see their own profiles, admins can see all
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (id = public.get_auth_user_id() OR auth.role() = 'service_role');

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = public.get_auth_user_id())
  WITH CHECK (id = public.get_auth_user_id());

CREATE POLICY "Service role can manage all profiles"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- DEVELOPER PROFILES - Developer can manage their profile, admins can manage all
CREATE POLICY "Developers can manage their own profile"
  ON public.developer_profiles
  FOR ALL
  USING (profile_id = public.get_auth_user_id())
  WITH CHECK (profile_id = public.get_auth_user_id());

CREATE POLICY "Service role can manage all developer profiles"
  ON public.developer_profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Developer profiles are viewable by everyone"
  ON public.developer_profiles
  FOR SELECT
  USING (true);

-- AGENT PROFILES - Agent can manage their profile, admins can manage all
CREATE POLICY "Agents can manage their own profile"
  ON public.agent_profiles
  FOR ALL
  USING (profile_id = public.get_auth_user_id())
  WITH CHECK (profile_id = public.get_auth_user_id());

CREATE POLICY "Service role can manage all agent profiles"
  ON public.agent_profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Agent profiles are viewable by everyone"
  ON public.agent_profiles
  FOR SELECT
  USING (true);

-- PROPERTIES - Developers can manage their properties, agents can manage assigned properties
CREATE POLICY "Properties are viewable by everyone"
  ON public.properties
  FOR SELECT
  USING (status = 'active' OR created_by = public.get_auth_user_id() OR auth.role() = 'service_role');

CREATE POLICY "Developers can manage their own properties"
  ON public.properties
  FOR ALL
  USING (created_by = public.get_auth_user_id())
  WITH CHECK (created_by = public.get_auth_user_id());

CREATE POLICY "Service role can manage all properties"
  ON public.properties
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- PROPERTY UNITS - Follows property access patterns
CREATE POLICY "Property units are viewable with property"
  ON public.property_units
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND (p.status = 'active' OR p.created_by = public.get_auth_user_id() OR auth.role() = 'service_role')
    )
  );

CREATE POLICY "Property creators can manage property units"
  ON public.property_units
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  );

CREATE POLICY "Service role can manage all property units"
  ON public.property_units
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- PROPERTY MEDIA - Follows property access patterns
CREATE POLICY "Property media is viewable with property"
  ON public.property_media
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND (p.status = 'active' OR p.created_by = public.get_auth_user_id() OR auth.role() = 'service_role')
    )
  );

CREATE POLICY "Property creators can manage property media"
  ON public.property_media
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  );

CREATE POLICY "Service role can manage all property media"
  ON public.property_media
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- INQUIRIES - Users can see their own inquiries, property owners see inquiries for their properties
CREATE POLICY "Users can view their own inquiries"
  ON public.inquiries
  FOR SELECT
  USING (profile_id = public.get_auth_user_id());

CREATE POLICY "Property owners can view inquiries for their properties"
  ON public.inquiries
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  );

CREATE POLICY "Users can create inquiries"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (profile_id = public.get_auth_user_id());

CREATE POLICY "Service role can manage all inquiries"
  ON public.inquiries
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- FAVORITES - Users can manage their own favorites
CREATE POLICY "Users can manage their own favorites"
  ON public.favorites
  FOR ALL
  USING (profile_id = public.get_auth_user_id())
  WITH CHECK (profile_id = public.get_auth_user_id());

CREATE POLICY "Service role can manage all favorites"
  ON public.favorites
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- AGENT PROPERTIES - Agents can see their assigned properties
CREATE POLICY "Agents can view their assigned properties"
  ON public.agent_properties
  FOR SELECT
  USING (
    agent_id IN (
      SELECT id FROM public.agent_profiles
      WHERE profile_id = public.get_auth_user_id()
    )
  );

CREATE POLICY "Property owners can manage agent assignments"
  ON public.agent_properties
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  );

CREATE POLICY "Service role can manage all agent properties"
  ON public.agent_properties
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- SUBSCRIPTIONS - Users can view their own subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON public.subscriptions
  FOR SELECT
  USING (profile_id = public.get_auth_user_id());

CREATE POLICY "Service role can manage all subscriptions"
  ON public.subscriptions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- INVOICES - Users can view their own invoices
CREATE POLICY "Users can view their own invoices"
  ON public.invoices
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.subscriptions s
      WHERE s.id = subscription_id
      AND s.profile_id = public.get_auth_user_id()
    )
  );

CREATE POLICY "Service role can manage all invoices"
  ON public.invoices
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- PROPERTY UPDATES - Property owners can manage updates, all can view
CREATE POLICY "Everyone can view property updates"
  ON public.property_updates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.status = 'active'
    )
  );

CREATE POLICY "Property owners can manage updates"
  ON public.property_updates
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id
      AND p.created_by = public.get_auth_user_id()
    )
  );

CREATE POLICY "Service role can manage all property updates"
  ON public.property_updates
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- NOTIFICATIONS - Users can only see their own notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications
  FOR SELECT
  USING (profile_id = public.get_auth_user_id());

CREATE POLICY "Users can mark their notifications as read"
  ON public.notifications
  FOR UPDATE
  USING (profile_id = public.get_auth_user_id())
  WITH CHECK (profile_id = public.get_auth_user_id() AND (read = true OR read IS NULL));

CREATE POLICY "Service role can manage all notifications"
  ON public.notifications
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');