import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class Firebase {

  constructor() {}

  auth = firebase.auth();
  db = firebase.database();
  serverValue = firebase.database.ServerValue;


  // *** Auth API ***
  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  // *** Merge Auth and DB User API *** //

  onAuthUserListener(next, fallback) {
    return this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  }

  // *** User API ***

  user(uid) {
    return this.db.ref(`users/${uid}`);
  }

  users() {
    return this.db.ref('users');
  }

}
