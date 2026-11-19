import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description = "Welkom op het Nucleaire Geneeskunde Portaal. Betrouwbare medische informatie over behandelingen, onderzoeken en wetenschappelijk onderwijs.", 
  type = "website" 
}: SEOProps) => {
  useEffect(() => {
    // 1. Update Title
    document.title = `${title} | NG Portaal`;

    // 2. Helper function for meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Set standard SEO attributes
    setMetaTag('description', description);
    
    // 4. Set Open Graph (OG) tags for social media sharing (WhatsApp, LinkedIn, etc.)
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', type, true);
  }, [title, description, type]);

  return null; // Component does not render anything visual
};
