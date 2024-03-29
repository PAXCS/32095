import admin from "firebase-admin";
import config from "../config";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async getById(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`);
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async getAll() {
    try {
      const result = [];
      const snapshot = await this.coleccion.get();
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(nuevoElem) {
    try {
      const guardado = await this.coleccion.add(nuevoElem);
      return { ...nuevoElem, id: guardado.id };
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(nuevoElem) {
    try {
      const actualizado = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
      return actualizado;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async delete(id) {
    try {
      const item = await this.coleccion.doc(id).delete();
      return item;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    // version fea e ineficiente pero entendible para empezar
    try {
      const docs = await this.getAll();
      const ids = docs.map((d) => d.id);
      const promesas = ids.map((id) => this.delete(id));
      const resultados = await Promise.allSettled(promesas);
      const errores = resultados.filter((r) => r.status == "rejected");
      if (errores.length > 0) {
        throw new Error("no se borró todo. volver a intentarlo");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async desconectar() {}
}

export default ContenedorFirebase;