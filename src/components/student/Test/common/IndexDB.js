export const openDB = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(storeName)) {
        db.close();

        const versionRequest = indexedDB.open(dbName, db.version + 1);

        versionRequest.onupgradeneeded = (upgradeEvent) => {
          const upgradedDb = upgradeEvent.target.result;
          upgradedDb.createObjectStore(storeName, { keyPath: "id" });
          console.log(`Created object store: ${storeName} in version upgrade`);
        };

        versionRequest.onsuccess = (versionEvent) => {
          resolve(versionEvent.target.result);
        };

        versionRequest.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        resolve(db);
      }
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
        console.log(`Created object store: ${storeName}`);
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const saveData = async (db, storeName, data) => {
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  for (const [id, value] of Object.entries(data)) {
    store.put({ id, value });
  }
};

export const getData = async (db, storeName) => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result.reduce((acc, item) => {
        acc[item.id] = item.value;
        return acc;
      }, {});
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
};

export const deleteData = (dbName, storeName, key) => {
  const request = indexedDB.open(dbName);

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    if (key) {
      store.delete(key);
    } else {
      store.clear();
    }

    transaction.oncomplete = () => {
      console.log("Data deleted successfully");
    };

    transaction.onerror = (event) => {
      console.error("Error deleting data:", event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };
};
