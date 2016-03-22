import Repo from "ay-ember/utils/repo";

export default class RepoStore{
    constructor(){
        this.data = {};
    }
    get(storeName){
        var repo = null;
        
        var data = this.data[storeName];
        if(!data){
            var storage = this.getFromStorage(storeName);
            if(!storage || storage.length == 0){
                this.data[storeName] = [];
            }
            else{
                this.data[storeName] = storage;
            }
        }
        else{
            this.data[storeName] = data;
        }
        
        return new Repo(this.data[storeName]);
    }
    save(storeName){
        localStorage[storeName] = JSON.stringify(this.data[storeName]);
    }
    getFromStorage(storeName){
        var value = null;
        try {
            value = JSON.parse(localStorage[storeName]);
        } catch (error) {}
        
        return value;
    }
}