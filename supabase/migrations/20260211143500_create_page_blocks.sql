-- Create page_blocks table for dynamic page content
CREATE TABLE IF NOT EXISTS public.page_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('heading', 'paragraph', 'image', 'columns', 'cta')),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_blocks_page_id ON public.page_blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_page_blocks_order ON public.page_blocks(page_id, order_index);

-- Enable RLS
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public can read published page blocks, authenticated users can manage all blocks
DROP POLICY IF EXISTS "public_can_read_published_page_blocks" ON public.page_blocks;
CREATE POLICY "public_can_read_published_page_blocks"
ON public.page_blocks
FOR SELECT
TO public
USING (
    EXISTS (
        SELECT 1 FROM public.pages p
        WHERE p.id = page_blocks.page_id
        AND p.status = 'published'
    )
);

DROP POLICY IF EXISTS "authenticated_manage_all_page_blocks" ON public.page_blocks;
CREATE POLICY "authenticated_manage_all_page_blocks"
ON public.page_blocks
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Update RLS policies for pages table to allow public read of published pages
DROP POLICY IF EXISTS "public_can_read_published_pages" ON public.pages;
CREATE POLICY "public_can_read_published_pages"
ON public.pages
FOR SELECT
TO public
USING (status = 'published');

DROP POLICY IF EXISTS "authenticated_manage_all_pages" ON public.pages;
CREATE POLICY "authenticated_manage_all_pages"
ON public.pages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_page_blocks_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_page_blocks_updated_at_trigger ON public.page_blocks;
CREATE TRIGGER update_page_blocks_updated_at_trigger
BEFORE UPDATE ON public.page_blocks
FOR EACH ROW
EXECUTE FUNCTION public.update_page_blocks_updated_at();

-- Trigger for pages table updated_at
CREATE OR REPLACE FUNCTION public.update_pages_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_pages_updated_at_trigger ON public.pages;
CREATE TRIGGER update_pages_updated_at_trigger
BEFORE UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.update_pages_updated_at();