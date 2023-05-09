const DB = require("../config/DB");
const bcrypt = require('bcrypt');

class Banque {

    constructor(nom_banque, siege, telephone, fax, logo){
        this.nom_banque=nom_banque;
        this.siege=siege;
        this.telephone=telephone;
        this.fax=fax;
        this.logo=logo;
    }

    static getBanks (){
        let sql = "SELECT * FROM Banque;";
        let data = DB.execute(sql);
        return data;
    }


    static addBanque(id,data) {
        let sql = `INSERT INTO Banque(Banque_id, Nom_banque, Siege_social, Telephone, Fax) VALUES(${id} ,  "${data.Nom_banque}", "${data.Siege_social}", ${data.Telephone}, ${data.Fax});`;
        DB.execute(sql);
    }

    static updateBanque(id, data){
        let sql = `UPDATE Banque SET Nom_banque="${data.Nom_banque}", Siege_social="${data.Siege_social}", Telephone=${data.Telephone}, Fax=${data.Fax} WHERE Banque_id=${id};`;
        DB.execute(sql);
    }

    static deleteBanque(id){
        let sql = `DELETE FROM Banque WHERE Banque_id=${id}`;
        DB.execute(sql);
    }

    static async addPrestation(data) {
        let sql1 = `SELECT MAX(pres_id) AS max FROM prestations;`;
        let maxPres = await DB.execute(sql1);
        maxPres = maxPres[0][0].max;
        let sql2 = `SELECT MAX(Banque_id) AS max FROM Banque;`;
        let maxBanque = await DB.execute(sql2);
        maxBanque = maxBanque[0][0].max;
        let id = maxPres+1;
        for (let index = 100; index <= maxBanque ; index++) {
            let sql = `INSERT INTO prestations (pres_id,pres_nom,pres_type,frais,bank_id) VALUES (${id},${data.pres_nom},${data.pres_type},${"-1"},${index});`
            await DB.execute(sql);          
        }     
    }

    static async upadatePrestation(id,data){
        for (let index = 0; index < data.length; index++) {
            let sql = `UPDATE prestations SET frais="${data[index].frais}" WHERE pres_id=${data[index].pres_id} AND bank_id=${id};`
            await DB.execute(sql);          
        }
    }

    static async ajouterBanque(id,data){
        const bank = data.Banque;
        const prestations =data.Prestation;
        console.log(prestations);
        let sql1 = `SELECT MAX(pres_id) AS max FROM prestations;`;
        let maxPres = await DB.execute(sql1);
        maxPres = maxPres[0][0].max;
        let sql2 = `SELECT MAX(Banque_id) AS max FROM Banque;`;
        let maxBanque = await DB.execute(sql2);
        maxBanque = maxBanque[0][0].max;

        let sql = `INSERT INTO Banque (Banque_id,Nom_banque,Siege_social,Telephone,Fax,Logo,Localisation) VALUES (${id},"${bank.Nom_banque}","${bank.Siege_social}",${bank.Telephone},${bank.Fax},"${bank.Logo}","${bank.Localisation}");`
        await DB.execute(sql);

        let sql3 = `SELECT pres_type FROM prestations WHERE bank_id=100`;
        let prest =  await DB.execute(sql3);
        prest = prest[0];
        console.log(prestations);

        for (let index = 0; index < maxPres; index++) {
            let sql = `INSERT INTO prestations (pres_id,pres_nom,pres_type,frais,bank_id) VALUES (${prestations.pres_id},"${prestations.pres_nom}",${prest[index].pres_type},${prestations.frais},${id});`;
            await DB.execute(sql);          
        };
    }

    static deletePrestation(presId,bankId){
        let sql = `DELETE FROM Prestations WHERE pres_id=${presId} AND bank_id=${bankId}`;
        DB.execute(sql);
    }

    static getById (id) {
        let sql = `SELECT * FROM Banque WHERE Banque_id = ${id};`;
        return DB.execute(sql);
    }

    static getPrestationById (id) {
        let sql = `SELECT pres_id,pres_nom,frais FROM prestations WHERE bank_id = ${id};`;
        return DB.execute(sql);
    }

    static async foundUser (userName){
        let  sql = `SELECT EXISTS(SELECT * FROM Adminstrateur WHERE Nom='${userName}') AS user_exists;`;
        let [data,_] = await DB.execute(sql);
        return data[0].user_exists;
    }

    static async foundPwd (userName,pwd){
        let  sql = `SELECT * FROM Adminstrateur WHERE Nom='${userName}';`;
        let data = await DB.execute(sql);
        const match = await bcrypt.compare( pwd,data[0][0].Mot_de_passe);
        if(match){
            return 1;
        }
        else{
            return 0;
        }
    }
    static  newsTitles(){
        let sql = `SELECT * FROM NEWS;`;
        return DB.execute(sql);
    }
    static deleteNews(id){
        let sql = `DELETE FROM NEWS WHERE news_id=${id}`;
        DB.execute(sql);
    }
}


module.exports = Banque ;