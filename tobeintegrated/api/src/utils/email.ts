import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "notifications.epiflipboard@gmail.com",
    pass: "asxDR5thnJI9"
  },
  tls:{
    rejectUnauthorized: false
  }
})

export const getPasswordResetURL = (user, token) =>
  `http://localhost:3000/resetPassword/${user.id}/${token}`

export const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "Réinitialisation de votre mot de passe"
  const html = `
  <p>Bonjour ${user.name || user.email},</p>
  <p>Vous avez demandé une réinitialisation du mot de passe de votre compte epiFlipboard.</p>
  <p>Afin de créer votre nouveau mot de passe, veuillez cliquer sur le lien suivant : </p>
  <a href=${url}>${url}</a>
  <p>Ce lien est valable 1 heure. Passé ce délais, il expirera.</p>
  <p></p>
  <p>Si vous n'êtes pas à l'origine de cette demande, par mesure de prudence et afin de garantir la sécurité de vos données, nous vous recommandons de modifier le mot de passe de votre messagerie (adresse email utilisée pour accéder au compte epiFlipboard).</p>
  <p>Nous vous conseillons de choisir un mot de passe sécurisé qui respecte les consignes suivantes :</p>
  <p>- Le mot de passe doit comporter au moins 8 caractères.</p>
  <p>- Il doit se composer de quatre types de caractères différents : majuscules, minuscules, chiffres, et signes de ponctuation ou caractères spéciaux (€, #...).</p>
  <p>- Il ne doit pas faire référence à des informations personnelles (date de naissance, noms de vos enfants, conjoints ou animaux, etc.).</p>
  
  <p>Nous vous souhaitons d’agréables moments sur notre site.</p>
  <p></p>
  <p>L'équipe epiFlipboard</p>
  `

  return { from, to, subject, html }
}

export function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false)
      return false;
  return true;
}