const { Anime } = require('../../models/Anime/Anime.cjs');
const { AnimeGenre } = require('../../models/Anime/AnimeGenre.cjs');
const { AnimeInstallment } = require('../../models/Anime/AnimeInstallment.cjs');
const { AnimeOtherTranslation } = require('../../models/Anime/AnimeOtherTranslation.cjs');
const { AnimeRate } = require('../../models/Anime/AnimeRate.cjs');
const { AnimeStream } = require('../../models/Anime/AnimeStream.cjs');

async function CombineAnimeData(animeDBJSON)
{
    const genres = await AnimeGenre.GetAllByAnimeID(animeDBJSON.id);
    animeDBJSON.genres = genres.map((element) => { return element.genre});
    const installments = await AnimeInstallment.GetAllByAnimeID(animeDBJSON.id);
    animeDBJSON.installments = installments;
    const otherTranslations = await AnimeOtherTranslation.GetAllByAnimeID(animeDBJSON.id);
    animeDBJSON.otherTranslations = otherTranslations;
    const ratingData = await AnimeRate.GetAnimeIDRatingData(animeDBJSON.id);
    animeDBJSON.ratingData = ratingData;

    return animeDBJSON;
} 

async function CombineInstallmentData(animeInstallmentDBJSON)
{
    const animeInstallmentStreamList = await AnimeStream.GetAllByInstallmentID(animeInstallmentDBJSON.id);
    await Promise.all(animeInstallmentStreamList.map(async (animeStream) => { return await CombineAnimeStreamData(animeStream)}));
    animeInstallmentDBJSON.animeStreamList = animeInstallmentStreamList;
    return animeInstallmentDBJSON;
}


async function CombineAnimeStreamData(animeStreamDBJSON)
{
    const anime = await Anime.GetByID(animeStreamDBJSON.animeID);
    animeStreamDBJSON.animeTitle = anime.title;
    const animeInstallment = await AnimeInstallment.GetByID(animeStreamDBJSON.installmentID);
    animeStreamDBJSON.installmentSeasonNum = animeInstallment.seasonNum;

    return animeStreamDBJSON
}

const CombineDBJSON = {
    CombineAnimeData,
    CombineInstallmentData,
    CombineAnimeStreamData,
}

module.exports = CombineDBJSON;