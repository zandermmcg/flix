Primary Key: TYPE#ID
Sort Key: ATTRIBUTE
TYPE = MOVIE,TV,USER
ATTRIBUTE = PROFILE, INFO, COMMENT, RATING, FAVORITE

USER
{
    PK: USER#ID
    SK: PROFILE,FAVORITE,RATING,COMMENT.
}

PK: USER#ID
    {
        SK: PROFILE
        picture: string
        name: string
        age: int
        bio: string
    }
    {
        SK: FAVORITE

    }
    {
        SK: RATING

    }
    {
        SK: COMMENT

    }
    {
        SK: LIST
        name: string
        contents: int[] // list of id's
    }

MEDIA_TYPE = MOVIE,TV
pk: {MEDIA_TYPE}#ID
    {
        sk: INFO
        id: int
        title: string
        releaseDate: string
        overview: string
        runtime: int
        rating: float
        coverUrlPath: string
        budget: int
        revenue: int
        genres: string[]
        originCountry: string[]
        productionCompanies: string[]
        spokenLanguages: string[]
    }
    {
        SK: 
    }