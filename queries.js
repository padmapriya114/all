const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "cbanc.cny7tsngrm4b.us-east-2.rds.amazonaws.com",
  database: "postgres",
  password: "cbanc2021",
  port: 5432
});

const getdeal = (request, response) => {
  pool.query('select A.id, A.opportunityid,A.percentfunded,A.percentcommitted,A.retaining,A.deal_status_id,A.resourcetype,A.created,A.updated from cbanc2.deal A INNER JOIN cbanc2.opportunity B ON A.opportunityid= B.id ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getopportunity = (request, response) => {
  pool.query('SELECT A.opportunity_status_id,A.leadFee_servicefee,A.currentbalanceinpennies,A.updated,A.percentcommitted,A.contractid,A.loan_id,A.percentfunded,A.id,A.lead_name,A.lead_userid,A.lead_fi_id,A.grading,A.location_state,A.rate,A.dueby,A.term,A.created,A.retaining,A.resourcetype,A.description FROM	cbanc2.opportunity AINNER JOIN cbanc2.fi B ON A.lead_fi_id = B.id INNER JOIN cbanc2.loan C ON A.loan_id = C.id INNER JOIN cbanc2.loan_resource_type D ON C.loan_resource_type_id = D.id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const insertfi = (request, response) => {
const {id, accountid, accountnumber, wireroutingnumber, achroutingnumber, dwollafundingid, name, routingnumber, authtextid} = request.body
  pool.query( 'INSERT INTO cbanc.fi (id, accountid, accountnumber, wireroutingnumber, achroutingnumber, dwollafundingid, name, routingnumber, authtextid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[id, accountid, accountnumber, wireroutingnumber, achroutingnumber, dwollafundingid, name, routingnumber, authtextid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in fi')
  })
}

const insertloan = (request, response) => {
const {id,created,loan_status_id,loan_resource_type_id,loan_type_id} = request.body
  pool.query( "INSERT INTO cbanc.loan (id,created,loan_status_id,loan_resource_type_id,loan_type_id) VALUES ($1,$2,$3,$4,$5)",[id,created,loan_status_id,loan_resource_type_id,loan_type_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in loan')
  })
}


const insertloan_detail = (request, response) => {
const {id, daysdelinquent, expectedpaymentamountinpennies, interestrate, maturitydate, nextpaymentdate, originalprincipalinpennies, originationdate, outstandingprincipalinpennies, loan_id, paymentamountinpennies, maximumcreditinpennies, combinedloantovalueratios, creditlineusedpercent, referenceid} = request.body
  pool.query( "INSERT INTO cbanc2.loan_detail (id, daysdelinquent, expectedpaymentamountinpennies, interestrate, maturitydate, nextpaymentdate, originalprincipalinpennies, originationdate, outstandingprincipalinpennies, loan_id, paymentamountinpennies, maximumcreditinpennies, combinedloantovalueratios, creditlineusedpercent, referenceid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",[id, daysdelinquent, expectedpaymentamountinpennies, interestrate, maturitydate, nextpaymentdate, originalprincipalinpennies, originationdate, outstandingprincipalinpennies, loan_id, paymentamountinpennies, maximumcreditinpennies, combinedloantovalueratios, creditlineusedpercent, referenceid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in loan_detail')
  })
}


const insertloan_detail_borrower = (request, response) => {
const {id, creditscore, dti, fullname, address_id, loan_detail_id, created, updated} = request.body
  pool.query( "INSERT INTO cbanc2.loan_detail_borrower (id, creditscore, dti, fullname, address_id, loan_detail_id, created, updated) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",[id, creditscore, dti, fullname, address_id, loan_detail_id, created, updated], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in loan_detail_borrower')
  })
}


const insertloan_detail_collateral = (request, response) => {
const {id, valueinpennies, loan_detail_id, address_id, created, updated, type} = request.body
  pool.query( "INSERT INTO cbanc2.loan_detail_collateral (id, valueinpennies, loan_detail_id, address_id, created, updated, type) VALUES ($1,$2,$3,$4,$5,$6,$7)",[id, valueinpennies, loan_detail_id, address_id, created, updated, type], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in loan_detail_collateral')
  })
}


const insertaddress = (request, response) => {
const {id,address1,address2,city,state,zipcode} = request.body
  pool.query( "INSERT INTO loan (id,address1,address2,city,state,zipcode) VALUES ($1,$2,$3,$4,$5,$6)",[id,address1,address2,city,state,zipcode], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in address')
  })
}

const insertopportunity = (request, response) => {
const {id,lead_userId,lead_fi_Id,lead_name,currentBalanceInPennies,dueBy,retaining,location_city,location_state,location_street,rate,term,description,amortization,grading,leadFee_serviceFee,leadfee_flatFeeInPennies,opportunity_status_id,percentFunded,percentCommitted,contractId,resourceType,created,updated,loan_id} = request.body
 pool.query( "INSERT INTO cbanc2.opportunity (id, lead_userid, lead_fi_id, lead_name, currentbalanceinpennies, dueby, retaining, location_city, location_state, location_street, rate, term, description, amortization, grading, leadfee_servicefee, leadfee_flatfeeinpennies, opportunity_status_id, percentfunded,percentcommitted, contractid, resourcetype, created, updated, loan_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)",[id,lead_userId,lead_fi_Id,lead_name,currentBalanceInPennies,dueBy,retaining,location_city,location_state,location_street,rate,term,description,amortization,grading,leadFee_serviceFee,leadfee_flatFeeInPennies,opportunity_status_id,percentFunded,percentCommitted,contractId,resourceType,created,updated,loan_id],(error, results) => {
   if (error) {
     throw error
   }
   response.status(201).send('A new row is inserted in opportunity')
   })
   }




const insertopportunity_document = (request, response) => {
const { id, opportunity_document_type_id, url, opportunity_id, opportunity_document_content_type_id, opportunity_document_posted_by_name, opportunity_document_posted_by_fi_id, opportunity_document_posted_by_user_id, created, updated} = request.body
        pool.query( "INSERT INTO cbanc2.opportunity_document ( id, opportunity_document_type_id, url, opportunity_id, opportunity_document_content_type_id, opportunity_document_posted_by_name, opportunity_document_posted_by_fi_id, opportunity_document_posted_by_user_id, created, updated) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[ id, opportunity_document_type_id, url, opportunity_id, opportunity_document_content_type_id, opportunity_document_posted_by_name, opportunity_document_posted_by_fi_id, opportunity_document_posted_by_user_id, created, updated], (error, results) => {
          if (error) {
            throw error
          }
          response.status(201).send('A new row is inserted in opportunity_document ')
             })
      }



  const insertopportunity_tag = (request, response) => {
   const {opportunity_id, tag_id} = request.body
     pool.query( "INSERT INTO cbanc2.opportunity_tag (opportunity_id, tag_id) VALUES ($1,$2)",[opportunity_id, tag_id], (error, results) => {
       if (error) {
         throw error
       }
       response.status(201).send('A new row is inserted in opportunity_tag')
     })
   }


const insertdeal = (request, response) => {
const { id, oppotunityid, percentfunded, percentcommitted, retaining, deal_status_id, resourcetype, created, updated } = request.body
        pool.query( "INSERT INTO cbanc2.deal (id, oppotunityid, percentfunded, percentcommitted, retaining, deal_status_id, resourcetype, created, updated) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[id, oppotunityid, percentfunded, percentcommitted, retaining, deal_status_id, resourcetype, created, updated], (error, results) => {
          if (error) {
            throw error
          }
          response.status(201).send('A new row is inserted in deal')
        })
      }


const insertdeal_participant = (request, response) => {
const {id, userid, deal_id, percent, agreementid, resourcetype, fi_id, funded_amountinpennies, funded_date, funded_user_id, funded_name, created} = request.body
       pool.query( "INSERT INTO cbanc2.deal_participant (id, userid, deal_id, percent, agreementid, resourcetype, fi_id, funded_amountinpennies, funded_date, funded_user_id, funded_name, created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",[id, userid, deal_id, percent, agreementid, resourcetype, fi_id, funded_amountinpennies, funded_date, funded_user_id, funded_name, created],(error, results) => {
         if (error) {
           throw error
         }
         response.status(201).send('A new row is inserted in deal_participant')
         })
         }



const inserttransfer = (request, response) => {
const { id, amountinpennies, transfer_status_id,feeInpennies, transfer_feepaidby_id, rollupid, moneywas, previousprincipalbalanceinpennies, deal_participant_id,created,transfer_money_status_id} = request.body
  pool.query( "INSERT INTO cbanc2.transfer (id,amountinpennies,transfer_status_id,feeInpennies,transfer_feepaidby_id, rollupid, moneywas,previousprincipalbalanceinpennies, deal_participant_id,created,transfer_money_status_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[id, amountinpennies,transfer_status_id,feeInpennies,transfer_feepaidby_id, rollupid, moneywas, previousprincipalbalanceinpennies, deal_participant_id,created,transfer_money_status_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in transfer')
  })
}

const insertdisbursement = (request, response) => {
const { id, amountinpennies, disbursement_status_id,feeInpennies,disbursement_feepaidby_id,rollupid,disbursement_money_status_id,principalinpennies,disbursementdetails_interestinpennies,borrowerfeesinpennies,sellerfeesinpennies,memo,previousprincipalbalanceinpennies,deal_participant_id,created} = request.body
  pool.query( "INSERT INTO cbanc2.disbursement (id,amountinpennies,disbursement_status_id,feeInpennies,disbursement_feepaidby_id,rollupid,disbursement_money_status_id,principalinpennies,disbursementdetails_interestinpennies,borrowerfeesinpennies,sellerfeesinpennies,memo,previousprincipalbalanceinpennies,deal_participant_id,created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",[id,amountinpennies,disbursement_status_id,feeInpennies,disbursement_feepaidby_id,rollupid,disbursement_money_status_id,principalinpennies,disbursementdetails_interestinpennies,borrowerfeesinpennies,sellerfeesinpennies,memo,previousprincipalbalanceinpennies,deal_participant_id,created), (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new row is inserted in disbursement')
  })
}


const insertmessage = (request, response) => {
const {id,dealId,subject,author_userId,author_fiId,author_name,body,created,modified) = request.body
     pool.query( "INSERT INTO cbanc2.message (id,dealId,subject,author_userId,author_fiId,author_name,body,created,modified)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[id,dealId,subject,author_userId,author_fiId,author_name,body,created,modified],(error, results) => {
       if (error) {
         throw error
       }
       response.status(201).send('A new row is inserted in message')
       })
       }

module.exports = {
getopportunity,
getdeal,  
insertfi,
insertloan,
insertloan_detail,
insertaddress,
insertloan_detail_borrower,
insertloan_detail_collateral,
insertopportunity,
insertopportunity_document,
insertopportunity_tag,
insertdeal,
insertdeal_participant,
inserttransfer,
insertdisbursement,
insertmessage
}
