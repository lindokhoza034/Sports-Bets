export interface GameCategory{
    id: Number;
    name: string;
    slug: string;
    icon: string;
}
export interface GameTournament{
    id: Number;
    name: string;
    slug: string;
}

export interface GameQuestionOption{
    id: number;
    match_id: number;
    category_name: string;
    category_icon: string;
    tournament_name: string;
    match_name:string;
    question_id: number;
    question_name: number;
    option_name: number;
    ratio: number;
    is_unlock_question: number;
    is_unlock_match: number;
    status: number;
}
export interface GameQuestion{
    id: number;
    name: string;
    limit: number;
    end_time: Date;
    is_unlock: number;
    status: number;
    options: GameQuestionOption[];
}
export interface SportsGame{
        id: 13;
        start_date: Date;
        end_date: Date;
        category_id: number;
        tournament_id: number;
        team1_id: number;
        team2_id: number;
        name: string;
        name_slug: string;
        slug: string;
        status: number;
        team1: string;
        team1_img: string;
        team2: string;
        team2_img: string;
        game_category:GameCategory;
        game_tournament: GameTournament;
        totalQuestion: 0;
        questions: GameQuestion[];
} 
export interface SportsListing {
    liveList:SportsGame[];
    upcomingList:SportsGame[];
}

export interface Bet{
    slip: GameQuestionOption[];
    amount:string;
}