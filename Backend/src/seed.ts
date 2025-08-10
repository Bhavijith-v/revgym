import { connectDB } from "./config/db";
import Product from "./models/Product";
import Plan from "./models/Plan";

async function main() {
  await connectDB();

  await Product.deleteMany({});
  await Plan.deleteMany({});

  await Product.insertMany([
    { title:"Impact Whey Protein", brand:"MyProtein", price:2299, image:"https://images.unsplash.com/photo-1585238341267-1e4f0ec89f98?q=80&w=1200", category:"Protein", rating:4.6, options:{flavors:["Chocolate","Vanilla"], sizes:["1 kg","2.5 kg"]}},
    { title:"Creatine Monohydrate", brand:"MuscleTech", price:1599, image:"https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200", category:"Creatine", rating:4.7, options:{sizes:["300 g","500 g"]}},
    { title:"Electrolyte Water", brand:"Propel", price:120, image:"https://images.unsplash.com/photo-1526401281623-2b3cbe0b95c7?q=80&w=1200", category:"Drink", rating:4.2, options:{flavors:["Lemon","Orange","Berry"], sizes:["500 ml","750 ml","1 L"]}},
  ]);

  await Plan.insertMany([
    { key:"elite", title:"ELITE", blurb:"All-access to premium classes & gyms", price:{ monthly:948, annual:799 }},
    { key:"pro",   title:"PRO",   blurb:"Multi-gym access + group workouts",    price:{ monthly:591, annual:499 }},
    { key:"play",  title:"PLAY",  blurb:"Sports, sessions & open play",         price:{ monthly:901, annual:769 }},
    { key:"home",  title:"HOME",  blurb:"At-home workouts & programs",          price:{ monthly:141, annual:119 }},
  ]);

  console.log("✅ Seeded");
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
