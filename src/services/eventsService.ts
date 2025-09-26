
export interface ParsedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export const eventsService = {
  parseMarkdown(content: string): ParsedEvent[] {
    const events: ParsedEvent[] = [];
    const lines = content.split('\n');
    
    let currentEvent: Partial<ParsedEvent> = {};
    let id = 1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('## ') && !line.includes('Upcoming Events')) {
        // Save previous event if it exists
        if (currentEvent.title) {
          events.push({
            id: String(id++),
            title: currentEvent.title || '',
            date: this.formatDate(currentEvent.date || ''),
            time: currentEvent.time || '',
            location: currentEvent.location || ''
          });
        }
        
        // Start new event
        currentEvent = {
          title: line.substring(3).trim()
        };
      } else if (line.startsWith('**Date:')) {
        currentEvent.date = line.replace('**Date:', '').replace('**', '').trim();
      } else if (line.startsWith('**Time:')) {
        currentEvent.time = line.replace('**Time:', '').replace('**', '').trim();
      } else if (line.startsWith('**Location:')) {
        currentEvent.location = line.replace('**Location:', '').replace('**', '').trim();
      }
    }
    
    // Add the last event
    if (currentEvent.title) {
      events.push({
        id: String(id++),
        title: currentEvent.title || '',
        date: this.formatDate(currentEvent.date || ''),
        time: currentEvent.time || '',
        location: currentEvent.location || ''
      });
    }
    
    return events;
  },

  formatDate(dateStr: string): string {
    // Handle various date formats and convert to YYYY-MM-DD
    const monthMap: { [key: string]: string } = {
      'Jan': '01', 'January': '01',
      'Feb': '02', 'February': '02',
      'Mar': '03', 'March': '03',
      'Apr': '04', 'April': '04',
      'May': '05',
      'Jun': '06', 'June': '06',
      'Jul': '07', 'July': '07',
      'Aug': '08', 'August': '08',
      'Sep': '09', 'September': '09',
      'Oct': '10', 'October': '10',
      'Nov': '11', 'November': '11',
      'Dec': '12', 'December': '12'
    };

    // Try to parse the date string
    const dateRegex = /(\w+)\.?\s+(\d{1,2})(?:\/(\d{1,2}))?,?\s+(\d{4})/;
    const match = dateStr.match(dateRegex);
    
    if (match) {
      const [, monthStr, day1, day2, year] = match;
      const month = monthMap[monthStr];
      const day = day2 || day1; // Handle cases like "Sep. 13/14" - use first day
      
      if (month) {
        return `${year}-${month}-${day.padStart(2, '0')}`;
      }
    }
    
    return dateStr;
  }
};
