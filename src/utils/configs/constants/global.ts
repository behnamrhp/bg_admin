export const check_env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const baseUrl = check_env ? `http://192.168.1.10:8080` : `https://bonyangozar.com`;

export const limitContents = 12;
export const limitTableData: number = 10;
export const maxFileSize = 50;

export enum pagesName {
    sliders        = "اسلایدشو",
    posts          = "پست ها",
    users          = "کاربران",
    home           = "خانه",
    skills         = "مهارت ها",
    habits         = "عادات",
    habitLogs      = "اطلاعات عادات",
    userScors      = "امتیازات",
    selfEvaluation = "خودارزشیابی",
}

export enum userTab {
    skills          = 'توانمندی ها',
    habits          = 'عادات',
    habitLogs       = 'اطلاعات عادات',
    userScores      = 'امتیازات',
    selfEvaluation  = 'خودارزیابی'
}