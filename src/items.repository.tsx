import Firebase from 'firebase';
import { firebaseConfig } from './security/firebase.config';
import { TodoItem } from './models';

export default class ItemsRepository {
    private collection: Firebase.database.Reference;
    private database: Firebase.database.Database;

    constructor() {
        Firebase.initializeApp(firebaseConfig);
        this.database = Firebase.database();
        this.collection = this.database.ref('items');
    }

    subscribe(callback: (snapshot: TodoItem[]) => any) {
        this.collection.on('value', (state) => {
            const val = state.val();
            callback(val ? Object.values(val) : []);
            this.persistState(state);
        });
    }

    persistState(state: any) {
        localStorage.setItem('state', JSON.stringify(Object.values(state)));
    }

    async getSnapshot(): Promise<TodoItem[]> {
        const snapshot = await this.collection.once('value');
        return Object.values(snapshot.val());
    }

    add(item: TodoItem) {
        this.collection.child(item.id).set(item);
    }

    async update(item: TodoItem): Promise<void> {
        this.collection.child(item.id).update(item);
    }

    async delete(id: string): Promise<void> {
        this.collection.child(id).remove();
    }
}