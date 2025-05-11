const express = require("express");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");
const path = require("path");

const db = new Database("feedback.db", { verbose: console.log });

const preload = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;
  db.exec(sql);
};

preload();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const data = {
    title: "Intellectia",
    platformName: "Intellectia",
    slogan: "Transformă cunoașterea într-un drum comun",
    description:
      "Intellectia oferă profesorilor și studenților un spațiu deschis de învățare colaborativă.",
    aboutText:
      "Intellectia este o platformă digitală de e-learning care permite profesorilor să își încarce cursurile online, iar studenții le pot accesa gratuit sau contra-cost.",
    features: [
      {
        icon: "fas fa-chalkboard-teacher",
        title: "Pentru Profesori",
        description:
          "Îți poți publica materialele didactice, testele și videocursurile.",
      },
      {
        icon: "fas fa-book-open",
        title: "Pentru Studenți",
        description:
          "Accesezi resurse educaționale interactive, pe tabletă, telefon sau calculator.",
      },
      {
        icon: "fas fa-money-bill-wave",
        title: "Flexibilitate Monetară",
        description:
          "Decizi dacă materialul tău este gratuit sau are un cost simbolic.",
      },
    ],
    teacherDescription:
      "Ca profesor, poți crea cont gratuit și începe să îți încarci materialele didactice în câteva minute.",
    teacherBenefits: [
      "Creează cursuri multimedia",
      "Adaugă teste interactiv",
      "Decide modelul de monetizare",
    ],
    studentDescription:
      "Accesează un catalog vast de materiale educaționale realizate de profesori experimentați.",
    studentBenefits: [
      "Materiale actualizate și interactive",
      "Suport pentru examene și proiecte",
      "Învățare la orice oră, oriunde",
    ],
    testimonials: [
      {
        text: "Platforma m-a ajutat enorm în pregătirea examenelor. Mulțumesc tuturor profesorilor!",
        author: "- Maria S., Studentă",
      },
      {
        text: "Am reușit să-mi creez primele cursuri video. Intellectia mi-a ușurat procesul.",
        author: "- Adrian P., Profesor",
      },
      {
        text: "Este o combinație perfectă între educație și tehnologie. Recomand tuturor!",
        author: "- Bogdan M., Student",
      },
    ],
    contactText: "Suntem aici să te ajutăm să începi.",
    year: new Date().getFullYear(),
    thanks: false,
  };

  res.render("index", data);
});

app.post("/contact", (req, res) => {
  const { email, subject, message } = req.body;

  const stmt = db.prepare(
    `INSERT INTO feedback (email, subject, content) VALUES (?, ?, ?)`
  );
  stmt.run(email, subject, message);

  const data = {
    title: "Intellectia",
    platformName: "Intellectia",
    slogan: "Transformă cunoașterea într-un drum comun",
    description:
      "Intellectia oferă profesorilor și studenților un spațiu deschis de învățare colaborativă.",
    aboutText:
      "Intellectia este o platformă digitală de e-learning care permite profesorilor să își încarce cursurile online, iar studenții le pot accesa gratuit sau contra-cost.",
    features: [
      {
        icon: "fas fa-chalkboard-teacher",
        title: "Pentru Profesori",
        description:
          "Îți poți publica materialele didactice, testele și videocursurile.",
      },
      {
        icon: "fas fa-book-open",
        title: "Pentru Studenți",
        description:
          "Accesezi resurse educaționale interactive, pe tabletă, telefon sau calculator.",
      },
      {
        icon: "fas fa-money-bill-wave",
        title: "Flexibilitate Monetară",
        description:
          "Decizi dacă materialul tău este gratuit sau are un cost simbolic.",
      },
    ],
    teacherDescription:
      "Ca profesor, poți crea cont gratuit și începe să îți încarci materialele didactice în câteva minute.",
    teacherBenefits: [
      "Creează cursuri multimedia",
      "Adaugă teste interactiv",
      "Decide modelul de monetizare",
    ],
    studentDescription:
      "Accesează un catalog vast de materiale educaționale realizate de profesori experimentați.",
    studentBenefits: [
      "Materiale actualizate și interactive",
      "Suport pentru examene și proiecte",
      "Învățare la orice oră, oriunde",
    ],
    testimonials: [
      {
        text: "Platforma m-a ajutat enorm în pregătirea examenelor. Mulțumesc tuturor profesorilor!",
        author: "- Maria S., Studentă",
      },
      {
        text: "Am reușit să-mi creez primele cursuri video. Intellectia mi-a ușurat procesul.",
        author: "- Adrian P., Profesor",
      },
      {
        text: "Este o combinație perfectă între educație și tehnologie. Recomand tuturor!",
        author: "- Bogdan M., Student",
      },
    ],
    contactText: "Suntem aici să te ajutăm să începi.",
    year: new Date().getFullYear(),
    thanks: true,
  };

  res.render("index", data);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
