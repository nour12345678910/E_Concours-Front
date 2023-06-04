import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
  transform(logs: any[], searchDate: string): any[] {
    if (!searchDate || searchDate.trim() === '') {
      return logs;
    }

    const searchDateObj = this.parseDateString(searchDate);

    return logs.filter(log => {
      const logDate = new Date(log.date);
      return this.isSameDate(logDate, searchDateObj);
    });
  }

  private parseDateString(dateString: string): Date | null {
    const dateParts = dateString.split('/'); // Split by forward slash (/)
    const year = parseInt(dateParts[2], 10);
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based (0-11)

    return new Date(day, month, year);
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
