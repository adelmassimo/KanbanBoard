import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'object_list'; 

@Injectable()

export class LocalStorageService {
  objectsList = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(obj: any): void {
    this.storage.remove(STORAGE_KEY);
    const objectsList = this.storage.get(STORAGE_KEY) || [];         
     objectsList.push(obj);          
    this.storage.set(STORAGE_KEY, objectsList); 
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public getLocalStorageContent():any{
    return this.storage.get(STORAGE_KEY) || 'LocaL storage is empty';
  }
  public isEmpty(){
    if(this.storage.get(STORAGE_KEY) != undefined ){
      return false;
    }else{
      return true;
    }
  }
  public removeFromStorage(){
    this.storage.remove(STORAGE_KEY);
  }

}