// ==UserScript==
// @name         PathOfExileTradeAttackSpeed
// @namespace    https://github.com/ekaerik/PathOfExileTools
// @version      0.2
// @description  Help calculate actual attack speed based on base type, local attack speed and global attack speed modifiler
// @author       Erik Eka Sundberg
// @match        https://www.pathofexile.com/trade/search/Metamorph/*
// @run-at       context-menu
// @grant        GM_log
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    "use strict";

    // Fill in this
    const increaseFromTree = 1.29;



    const $ = window.jQuery
    const bases = [
      { Key: "Driftwood Sceptre", Value: 1.55 },
      { Key: "Darkwood Sceptre", Value: 1.5 },
      { Key: "Bronze Sceptre", Value: 1.4 },
      { Key: "Quartz Sceptre", Value: 1.4 },
      { Key: "Iron Sceptre", Value: 1.4 },
      { Key: "Ochre Sceptre", Value: 1.45 },
      { Key: "Ritual Sceptre", Value: 1.2 },
      { Key: "Shadow Sceptre", Value: 1.25 },
      { Key: "Grinning Fetish", Value: 1.5 },
      { Key: "Horned Sceptre", Value: 1.3 },
      { Key: "Sekhem", Value: 1.25 },
      { Key: "Crystal Sceptre", Value: 1.25 },
      { Key: "Lead Sceptre", Value: 1.25 },
      { Key: "Blood Sceptre", Value: 1.4 },
      { Key: "Royal Sceptre", Value: 1.2 },
      { Key: "Abyssal Sceptre", Value: 1.25 },
      { Key: "Stag Sceptre", Value: 1.3 },
      { Key: "Karui Sceptre", Value: 1.5 },
      { Key: "Tyrant's Sekhem", Value: 1.25 },
      { Key: "Opal Sceptre", Value: 1.25 },
      { Key: "Platinum Sceptre", Value: 1.25 },
      { Key: "Vaal Sceptre", Value: 1.4 },
      { Key: "Carnal Sceptre", Value: 1.2 },
      { Key: "Void Sceptre", Value: 1.25 },
      { Key: "Sambar Sceptre", Value: 1.3 },
      { Key: "Glass Shank", Value: 1.5 },
      { Key: "Skinning Knife", Value: 1.45 },
      { Key: "Stiletto", Value: 1.5 },
      { Key: "Flaying Knife", Value: 1.4 },
      { Key: "Prong Dagger", Value: 1.35 },
      { Key: "Poignard", Value: 1.5 },
      { Key: "Trisula", Value: 1.35 },
      { Key: "Gutting Knife", Value: 1.4 },
      { Key: "Ambusher", Value: 1.5 },
      { Key: "Sai", Value: 1.35 },
      { Key: "Carving Knife", Value: 1.45 },
      { Key: "Boot Knife", Value: 1.45 },
      { Key: "Copper Kris", Value: 1.3 },
      { Key: "Skean", Value: 1.45 },
      { Key: "Imp Dagger", Value: 1.2 },
      { Key: "Butcher Knife", Value: 1.4 },
      { Key: "Boot Blade", Value: 1.4 },
      { Key: "Golden Kris", Value: 1.2 },
      { Key: "Royal Skean", Value: 1.45 },
      { Key: "Fiend Dagger", Value: 1.2 },
      { Key: "Slaughter Knife", Value: 1.4 },
      { Key: "Ezomyte Dagger", Value: 1.4 },
      { Key: "Platinum Kris", Value: 1.2 },
      { Key: "Imperial Skean", Value: 1.5 },
      { Key: "Demon Dagger", Value: 1.2 }
    ];
    const cyclone = 3;
    const wantedAttackSpeed = 6.082;

    const result = $(".resultset");
    $('.attackSpeed').remove();

    result.children().each((i, e) => {
        let row = $(e);
        let baseType = row.find(".typeLine").text().trim();
        if (!baseType){
            return;
        }
        let baseSpeed = bases.find(b => b.Key === baseType).Value;
        let localIncrease = (row.find("span[data-field='stat.explicit.stat_210067635']").text().split("%")[0].trim() / 100) + 1;

        let attackSpeed = (((baseSpeed * cyclone) * localIncrease) * increaseFromTree).toFixed(3);

        if (attackSpeed > 6.082){
            row.find(".typeLine").after($("<div class='itemName attackSpeed'>" + attackSpeed + "</div>").css("color", "red"))
        } else {
            row.find(".typeLine").after($("<div class='itemName attackSpeed'>" + attackSpeed + "</div>").css("color", "green"))
        }
    });
  })();
