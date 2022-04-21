import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getRemoteImages',
})
export class GetRemoteImages implements PipeTransform {
  transform(value: string): string {
    return `https://storage.googleapis.com/sesamonero-images/${encodeURIComponent(
      value
    )}`;
  }
}
