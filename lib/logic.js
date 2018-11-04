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
 * @param {co.edu.eafit.kratos.TetraPakClassifierToCompany} trade
 * @transaction
 */
async function TetraPakClassifierToCompany(trade) {
    if (trade.paperboard < 1) {
		throw new Error('The amount of paperboard must be at least 1');
    }
    if (trade.polyethylene < 1) {
		throw new Error('The amount of polyethylene must be at least 1');
    }
    if (trade.aluminiumFoil < 1) {
		throw new Error('The amount of aluminium foil must be at least 1');
	}
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    let participantRegistry = await getParticipantRegistry('co.edu.eafit.kratos.Company');
    trade.owner.stock.paperboard.currentReusable += trade.paperboard;
    trade.owner.stock.polyethylene.currentReusable += trade.polyethylene;
    trade.owner.stock.aluminiumFoil.currentReusable += trade.aluminiumFoil;
    await assetRegistry.update(trade.owner.stock);
    await participantRegistry.update(trade.owner);
}

/**
 * Add newly bought paperboard to the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.BuyPaperboard} trade
 */
async function BuyPaperboard(trade) {
    if (trade.amount < 1) {
		throw new Error('The amount of paperboard must be at least 1');
	}
    trade.buyer.stock.paperboard.currentBought += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.buyer.stock);
}

/**
 * Add newly bought polyethylene to the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.BuyPolyethylene} trade
 */
async function BuyPolyethylene(trade) {
    if (trade.amount < 1) {
		throw new Error('The amount of polyethylene must be at least 1');
	}
    trade.buyer.stock.polyethylene.currentBought += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.buyer.stock);
}

/**
 * Add newly bought aluminium foil to the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.BuyAluminiumFoil} trade
 */
async function BuyAluminiumFoil(trade) {
    if (trade.amount < 1) {
		throw new Error('The amount of aluminium foil must be at least 1');
	}
    trade.buyer.stock.aluminiumFoil.currentBought += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.buyer.stock);
}

/**
 * Use bought (brand new) paperboard from the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.UseBoughtPaperboard} trade
 */
async function UseBoughtPaperboard(trade) {
    if (trade.owner.stock.paperboard.currentBought < trade.amount) {
		throw new Error('The amount of paperboard available is not enough');
    }
    if (trade.amount < 1) {
		throw new Error('The amount of paperboard must be at least 1');
	}
    trade.owner.stock.paperboard.currentBought -= trade.amount;
    trade.owner.stock.paperboard.usedBought += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}

/**
 * Use reusable paperboard from the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.UseReusablePaperboard} trade
 */
async function UseReusablePaperboard(trade) {
    if (trade.owner.stock.paperboard.currentReusable < trade.amount) {
		throw new Error('The amount of paperboard available is not enough');
    }
    if (trade.amount < 1) {
		throw new Error('The amount of paperboard must be at least 1');
	}
    trade.owner.stock.paperboard.currentReusable -= trade.amount;
    trade.owner.stock.paperboard.usedReusable += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}

/**
 * Use bought (brand new) polyethylene from the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.UseBoughtPolyethylene} trade
 */
async function UseBoughtPolyethylene(trade) {
    if (trade.owner.stock.polyethylene.currentBought < trade.amount) {
		throw new Error('The amount of polyethylene available is not enough');
    }
    if (trade.amount < 1) {
		throw new Error('The amount of polyethylene must be at least 1');
	}
    trade.owner.stock.polyethylene.currentBought -= trade.amount;
    trade.owner.stock.polyethylene.usedBought += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}

/**
 * Use reusable polyethylene from the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.UseReusablePolyethylene} trade
 */
async function UseReusablePolyethylene(trade) {
    if (trade.owner.stock.polyethylene.currentReusable < trade.amount) {
		throw new Error('The amount of polyethylene available is not enough');
    }
    if (trade.amount < 1) {
		throw new Error('The amount of polyethylene must be at least 1');
	}
    trade.owner.stock.polyethylene.currentReusable -= trade.amount;
    trade.owner.stock.polyethylene.usedReusable += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}

/**
 * Use bought (brand new) aluminium foil from the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.UseBoughtAluminiumFoil} trade
 */
async function UseBoughtAluminiumFoil(trade) {
    if (trade.owner.stock.aluminiumFoil.currentBought < trade.amount) {
		throw new Error('The amount of aluminium foil available is not enough');
    }
    if (trade.amount < 1) {
		throw new Error('The amount of aluminium foil must be at least 1');
	}
    trade.owner.stock.aluminiumFoil.currentBought -= trade.amount;
    trade.owner.stock.aluminiumFoil.usedBought += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}

/**
 * Use reusable aluminium foil from the company's stock
 * @transaction
 * @param {co.edu.eafit.kratos.UseReusableAluminiumFoil} trade
 */
async function UseReusableAluminiumFoil(trade) {
    if (trade.owner.stock.aluminiumFoil.currentReusable < trade.amount) {
		throw new Error('The amount of aluminium foil available is not enough');
    }
    if (trade.amount < 1) {
		throw new Error('The amount of aluminium foil must be at least 1');
	}
    trade.owner.stock.aluminiumFoil.currentReusable -= trade.amount;
    trade.owner.stock.aluminiumFoil.usedReusable += trade.amount;
    let assetRegistry = await getAssetRegistry('co.edu.eafit.kratos.Stock');
    await assetRegistry.update(trade.owner.stock);
}
