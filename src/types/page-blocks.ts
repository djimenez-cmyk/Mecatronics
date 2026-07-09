export type BlockType = 'heading' | 'paragraph' | 'image' | 'html' | 'columns' | 'video' | 'pdf';

export interface BlockStyles {
  textColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface HeadingContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  styles?: BlockStyles;
}

export interface ParagraphContent {
  text: string;
  styles?: BlockStyles;
}

export interface ImageContent {
  url: string;
  alt: string;
  source?: 'url' | 'storage'; // 'url' for external URL, 'storage' for Supabase storage
  storageId?: string; // ID from media_files table if source is 'storage'
  width?: number; // Width in pixels
  height?: number; // Height in pixels
}

export interface HTMLContent {
  html: string;
}

export interface ColumnsContent {
  left: string;
  right: string;
}

export interface VideoContent {
  url: string;
  title: string;
  source?: 'url' | 'storage'; // 'url' for external URL, 'storage' for Supabase storage
  storageId?: string; // ID from media_files table if source is 'storage'
  width?: number; // Width in pixels
  height?: number; // Height in pixels
}

export interface PDFContent {
  url: string;
  title: string;
  storageId: string; // Required - PDF must come from storage
  buttonColor?: string; // Button background color
}

export type BlockContent = HeadingContent | ParagraphContent | ImageContent | HTMLContent | ColumnsContent | VideoContent | PDFContent;

export interface PageBlock {
  id: string;
  page_id: string;
  type: BlockType;
  content: BlockContent;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface DynamicPage {
  id: string;
  title: string;
  route: string;
  status: 'published' | 'draft' | 'scheduled';
  template: string;
  author: string;
  created_at: string;
  updated_at: string;
}