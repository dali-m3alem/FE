import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
  })
  export class FilterPipe implements PipeTransform {
    transform(array: any[], searchText: string): any[] {
        if (!array || !searchText) {
          return array;
        }
    
        searchText = searchText.toLowerCase();
    
        return array.filter(item => {
          // Vérifiez si la valeur de l'élément correspond à la recherche
          for (const key in item) {
            if (
              item.hasOwnProperty(key) &&
              typeof item[key] === 'string' &&
              item[key].toLowerCase().includes(searchText)
            ) {
              return true;
            }
          }
          return false;
        });
      }
    }
    
    
    
    