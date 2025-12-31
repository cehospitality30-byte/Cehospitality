import jsPDF from 'jspdf';

interface MenuItem {
  name: string;
  price?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
  note?: string;
}

export const generateMenuPdf = (menuData: MenuCategory[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Colors
  const primaryColor = '#D4AF37'; // Gold
  const textColor = '#1a1a1a';
  const mutedColor = '#666666';

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Header
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(212, 175, 55); // Gold
  doc.text('COZMO CAFE', pageWidth / 2, 25, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('BISTRO & LOUNGE', pageWidth / 2, 35, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.text('2nd Floor, KPHB 4th Phase, Near Lodha Bellaza Road, Hyderabad', pageWidth / 2, 45, { align: 'center' });

  yPosition = 65;

  // Menu sections
  menuData.forEach((category, categoryIndex) => {
    // Check if we need a new page for category header + at least 3 items
    checkPageBreak(40);

    // Category Header
    doc.setFillColor(245, 245, 245);
    doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(26, 26, 26);
    doc.text(`${category.emoji} ${category.name.toUpperCase()}`, margin, yPosition + 3);
    
    yPosition += 15;

    // Items
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    category.items.forEach((item, itemIndex) => {
      checkPageBreak(8);

      // Item name
      doc.setTextColor(51, 51, 51);
      const itemName = item.name;
      
      // Draw dotted line
      const nameWidth = doc.getTextWidth(itemName);
      const priceText = item.price || '';
      const priceWidth = priceText ? doc.getTextWidth(priceText) : 0;
      
      doc.text(itemName, margin, yPosition);
      
      if (priceText) {
        // Draw dots between name and price
        doc.setTextColor(200, 200, 200);
        const dotsStart = margin + nameWidth + 2;
        const dotsEnd = pageWidth - margin - priceWidth - 2;
        const dotSpacing = 3;
        
        for (let x = dotsStart; x < dotsEnd; x += dotSpacing) {
          doc.text('.', x, yPosition);
        }
        
        // Price
        doc.setTextColor(212, 175, 55); // Gold
        doc.setFont('helvetica', 'bold');
        doc.text(priceText, pageWidth - margin, yPosition, { align: 'right' });
        doc.setFont('helvetica', 'normal');
      }
      
      yPosition += 7;
    });

    // Category note
    if (category.note) {
      checkPageBreak(10);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.setFont('helvetica', 'italic');
      doc.text(category.note, margin, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 8;
    }

    yPosition += 8; // Space between categories
  });

  // Footer on last page
  const footerY = pageHeight - 15;
  doc.setFillColor(26, 26, 26);
  doc.rect(0, footerY - 10, pageWidth, 25, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text('Prices are subject to GST and service charge. Menu items may vary seasonally.', pageWidth / 2, footerY, { align: 'center' });
  doc.text('For reservations: +91 98765 43210 | www.cozmocafe.com', pageWidth / 2, footerY + 5, { align: 'center' });

  // Save the PDF
  doc.save('Cozmo-Cafe-Menu.pdf');
};
