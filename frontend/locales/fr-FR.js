export default {
  hi: 'Hello, {name}',
  datapatch: {
    intro: 'Bienvenue sur Data Patch',
    introUser: 'Bienvenue de nouveau sur Data Patch, {name}',
    pitch: 'Data Patch est (bientôt) une alternative open source à airtable.',
    infos: "Pour plus d'informations consultez la documentation sur le ",
    repo: "repo sur Github",
    codemos: "un projet libre par co-demos",
  },
  buttons: {
    prev: 'Précédent',
    continue: 'Continuer',
    submit: 'Envoyer',
    showDetails: 'Voir les détails',
    close: 'Fermer',
    back: 'Retour',
    options: 'Options',
    save: 'Enregister',
    update: 'Mettre à jour',
    create: 'Créer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    deleteConfirm: 'Oui, je supprime',
  },
  pages: {
    home: 'Accueil',
    me: 'Mes infos',
    groups: 'Mes groupes',
    notifications: 'Mes notifications',
    documentation: 'Documentation',
    workspaces: 'Espaces de travail',
    dataset: 'Jeu de données',
    workspacesOpen: 'Espaces de travail partagés',
    schemas: 'Schémas',
    schemasOpen: 'Schémas partagés',
    myworkspaces: 'Mes espaces de travail',
    myschemas: 'Mes schémas',
  },
  login: {
    in: 'Se connecter',
    inMsg: 'Connexion...',
    out: 'Se déconnecter',
    outMsg: 'Déconnexion...',
    sign: 'Créer un compte',
    signBtn: 'Créer mon compte',
    forgotpwd: "Mot de passe oublié ?",
    forgotpwdBack: "Retour au login",
    resetpwd: "M'envoyer un lien pour créer un nouveau mot de passe",
    newpwd: "Entrer un nouveau mot de passe",
    newpwdFor: "utilisateur : {email}",
    newpwdSend: "Enregistrer mon nouveau mot de passe",
    newpwdSent: "Un mail vous a été envoyé pour créer votre nouveau mot de passe.",
    newpwdOk: "Votre nouveau mot de passe est enregistré, vous pouvez vous connecter",
    isAccount: 'Déjà un compte ?',
    formUsername: 'Pseudo',
    formName: 'Prénom',
    formSurname: 'Nom',
    formEmail: 'Votre adresse email',
    formEmailLabel: 'Email',
    formPwd: 'Votre mot de passe',
    formPwdChoose: 'Choose a password',
    formPwdLabel: 'Mot de passe',
    formCheckLabel: "J'accepte les conditions générales d'utilisation",
    emailSent: 'Un email de vérification vous a été envoyé.',
    checkEmail: 'Consultez votre boîte mail et cliquez sur le lien afin de vérifier votre email',
    verifyEmail: 'Vérification de votre email...',
    verifyOk: 'Votre email a bien été vérifié.',
    verifyOk2: 'Votre compte est maintenant actif.',
    failVerify: 'Echec de la vérification...',
  },
  me: {
    save: 'Enregistrer mes changements',
    deleteMe: 'Supprimer mon compte',
    username: 'Pseudo',
    name: 'Prénom',
    surname: 'Nom',
    email: 'Email',
    description: 'Description',
    avatar: 'Avatar',
  },
  rules: {
    valEnter: "Merci d'entrer une valeur",
    emailRequired: 'Un email est obligatoire',
    emailValid: "L'email n'est pas valide",
    pwdType: 'Entrer un mot de passe',
    pwdChars: 'Minimum 6 caractères',
    pwdConfirmType: 'Confirmer le mot de passe',
    pwdConfirmMatch: 'Les mots de passe ne correspondent pas',
    checkAgree: 'Vous devez accepter pour continuer',
  },
  tabs: {
    infos: 'Infos',
    auth: 'Autorisations',
    prefs: 'Préférences',
    meta: 'Meta',
  },
  auth: {
    ownerOnly: 'Propriétaire uniquement',
    groups: 'Groupes',
    users: 'Utilisateurs',
    public: 'Public',
    read: 'Lire',
    comment: 'Commenter',
    patch: 'Améliorer',
    write: 'Ecrire',
    manage: 'Gérer',
  },
  dataPackage: {
    workspace: 'Espace de travail',
    dataset: 'Jeu de données', 
    datasets: 'Jeux de données', 
    table: 'Table', 
    tables: 'Tables', 
    schema: 'Schema', 
    schemas: 'Schemas',
    field: 'Champ', 
    fields: 'Champs', 
    owner: 'Propriétaire',
    owner_id: 'ID propriétaire',
    id: 'Id',
    url: 'URL',
    name: 'Nom',
    title: 'Titre',
    color: 'Couleur', 
    description: 'Description', 
    creationDate: 'Date de création',
    icon: 'Icône', 
    licence: 'License', 
  },
  workspaces: {
    defaultHelp: 'Vous pouvez désormais créer un nouvel espace de travail...',
    defaultTitle: 'Mon nouvel espace de travail',
    defaultDescription: 'La description de mon espace de travail',
    myWorkspaces: 'Mes espaces de travail',
    inviteWorkspace: 'Inviter une personne ou un groupe',
    prefsWorkspace: "Préférences de l'espace de travail",
    renameWorkspace: "Renommer l'espace de travail",
    addWorkspace: 'Créer un espace de travail',
    searchDataset: 'Rechercher une base de données',
    addDataset: 'Ajouter une base de données',
    editWorkspace: "Editer les informations de l'espace de travail",
    deleteWorkspace: 'Supprimer cet espace de travail',
    deleteWorkspaceConfirm: 'Etes-vous sûr.e de vouloir supprimer cet espace de travail ainsi que tous ses jeux de données associés ?',
  },
  datasets: {
    defaultTitle: 'Mon nouveau jeu de données',
    defaultDescription: 'La description de mon jeu de données',
    prefsDataset: 'Préférences du jeu de données',
    inviteDataset: 'Inviter une personne ou un groupe',
    editDataset: 'Editer les informations du jeu de données',
    renameDataset: 'Renommer le jeu de données',
    newDataset: 'Créer une nouveau jeu de données',
    copyDataset: 'Copier le jeu de données',
    importData: 'Importer un jeu de données',
    blankDataset: 'Créer un jeu de données vide',
    pasteDataset: 'Copier-coller une table',
    deleteDataset: 'Supprimer ce jeu de données',
    deleteDatasetConfirm: 'Etes-vous sûr.e de vouloir supprimer ce jeu de données ?',
  },
}
