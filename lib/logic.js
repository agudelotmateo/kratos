/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Enter the output of the classifying process to the company's stock
 * @param {co.edu.eafit.kratos.TetraPakClassifierToCompany} trade - the trade to be processed
 * @transaction
 */
async function TetraPakClassifierToCompany(trade) {
    trade.owner.stock.paperboard.currentReusable += trade.paperboard;
    trade.owner.stock.polyethylene.currentReusable += trade.polyethylene;
    trade.owner.stock.aluminiumFoil.currentReusable += trade.aluminiumFoil;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}

// /**
//  * Enter the output of the classifying process to the company's stock
//  * @param {co.edu.eafit.kratos.TetraPakClassifierToCompany} tetraPakClassifierToCompany
//  * @transaction
//  */
// async function TetraPakClassifierToCompany(tx) {
//     console.log(tx);
//     tx.owner.paperboard.currentReusable += tx.paperboard;
//     tx.owner.polyethylene.currentReusable += tx.polyethylene;
//     tx.owner.aluminiumFoil.currentReusable += tx.aluminiumFoil;

//     let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
//     await assetRegistry.update(tx.owner);
// }

// /**
//  * Add newly bought paperboard to the company's stock
//  * @transaction
//  * @param {co.edu.eafit.kratos.BuyPaperboard} buyPaperboard
//  */
// async function BuyPaperboard(tx) {
//     buyPaperboard.buyer.paperboard.currentBought += buyPaperboard.amout;

//     let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
//     await assetRegistry.update(buyPaperboard.buyer);
// }

// /**
//  * Add newly bought polyethylene to the company's stock
//  * @transaction
//  * @param {co.edu.eafit.kratos.BuyPolyethylene} buyPolyethylene
//  */
// async function BuyPolyethylene(tx) {
//     buyPolyethylene.buyer.polyethylene.currentBought += buyPolyethylene.amout;

//     let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
//     await assetRegistry.update(buyPolyethylene.buyer);
// }

// /**
//  * Add newly bought aluminium foil to the company's stock
//  * @transaction
//  * @param {co.edu.eafit.kratos.BuyAluminiumFoil} buyAluminiumFoil
//  */
// async function BuyAluminiumFoil(tx) {
//     buyAluminiumFoil.buyer.aluminiumFoil.currentBought += buyAluminiumFoil.amout;

//     let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
//     await assetRegistry.update(buyAluminiumFoil.buyer);
// }

// /**
//  * Use bought (brand new) paperboard from the company's stock
//  * @transaction
//  * @param {co.edu.eafit.kratos.UseBoughtPaperboard} useBoughtPaperboard
//  */
// async function UseBoughtPaperboard(tx) {
//     useBoughtPaperboard.buyer.paperboard.currentBought += useBoughtPaperboard.amout;

//     let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
//     await assetRegistry.update(useBoughtPaperboard.buyer);
// }
