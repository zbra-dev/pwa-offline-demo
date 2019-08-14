import Firebase from 'firebase';
import { firebaseConfig } from './firebase.config';

export default class ItemsRepository {
    private collection: Firebase.firestore.CollectionReference;
    constructor() {
        Firebase.initializeApp(firebaseConfig);
        this.collection = Firebase.firestore().collection('items');
    }

    list(): any[] {
        const items: any[] = [];
        this.collection.get().then((value) => {
            value.docs.map(doc => items.push(doc.data()));
        });
        return items;
    }

    add(item: any): Promise<Firebase.firestore.DocumentReference> {
        return this.collection.add(item); //use this return value's id property to update or remove it from the database
    }

    async update(item: any): Promise<void> {
        return (await this.collection.doc(item.id)).update(item);
    }

    async delete(item: any): Promise<void> {
        return (await this.collection.doc(item.id)).delete();
    }
}