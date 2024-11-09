import { addMinutes, endOfDay, endOfYear, format, isAfter, isValid, parse, startOfDay, startOfYear, subMonths, subYears, toDate } from 'date-fns';
import { fr } from 'date-fns/locale';

const FRENCH_DATE = 'dd/MM/yyyy';
const ENGLISH_DATE = 'yyyy/MM/dd';
const MONTH_YEAR = 'MM/yyyy';
const TIME = 'HH:mm:ss';
const HOUR_MINUTE = 'HH:mm';
const DASH_DATE = 'yyyy-MM-dd';
const SLASH_DATE_TIME = 'yyyy/MM/dd-HH:mm:ss';
const DASH_DATE_TIME = 'yyyy-MM-dd-HH:mm:ss';
const STRING_DAY_MONTH ='dd MMMM';

export class DateHelper {
    /**
     * Renvoie une valeur au format date à partir d'une string
     * @param value Date au format string
     */
    public static stringToDate(value: string) {
        return toDate(value);
    }

    /**
     * Renvoie une date à partir d'une string au format YYYY/MM/DD-HH:mm:ss
     * @param value Date au format string
     */
    public static fromFrenchDate(value: string) {
        return parse(value, FRENCH_DATE, new Date());
    }

    /**
     * Renvoie une date à partir d'une string au format YYYY-MM-DD
     * @param value Date au format string
     */
    public static fromDashDate(value: string) {
        return parse(value, DASH_DATE, new Date());
    }

    /**
     * Renvoie une date à partir d'une string au format YYYY/MM/DD-HH:mm:ss
     * @param value Date au format string
     */
    public static fromSlashDateTime(value: string) {
        return parse(value, SLASH_DATE_TIME, new Date());
    }

    /**
     * Formate la date au format DD/MM/YYYY
     * @param date Date
     */
    public static formatAsFrenchDate(date: Date) {
        return format(date, FRENCH_DATE);
    }

    /**
     * Formate la date au format YYYY/MM/DD
     * @param date Date
     */
    public static formatAsEnglishDate(date: Date) {
        return format(date, ENGLISH_DATE);
    }

    /**
     * Formate la date au format HH:mm:ss
     * @param date Date
     */
    public static formatAsTime(date: Date) {
        return format(date, TIME);
    }

    /**
     * Formate la date au format HH:mm
     * @param date Date
     */
    public static formatAsHourMinute(date: Date) {
        return format(date, HOUR_MINUTE);
    }

    /**
     * Formate la date au format YYYY-MM-DD-HH:mm:ss
     * @param date Date
     */
    public static formatAsDashDateTime(date: Date) {
        return format(date, DASH_DATE_TIME);
    }

    /**
     * Formate la date au format YYYY/MM/DD-HH:mm:ss
     * @param date Date
     */
    public static formatAsSlashDateTime(date: Date) {
        return format(date, SLASH_DATE_TIME);
    }

    /**
     * Formate la date au format YYYY-MM-DD
     * @param date Date
     */
    public static formatAsDashDate(date: Date) {
        return format(date, DASH_DATE);
    }

    /**
     * Formate la date au format MM/YYYY
     * @param date Date
     */
    public static fromMonthYear(date: Date) {
        return format(date, MONTH_YEAR);
    }

    /**
     * Formate la date au format d MMMM
     * @param date Date
     */
    public static formatAsStringDayMonth(date: Date) {
        return format(date, STRING_DAY_MONTH,  { locale: fr });
    }

    /**
     * Formate une string au format MM/YYYY
     * @param value Date au format string
     */
    public static fromStringToMonthYear(value: string) {
        const stringToDate = this.stringToDate(value);
        return format(stringToDate, MONTH_YEAR);
    }

    /**
     * Renvoie une date au format DD/MM/YYYY à partir d'une string au format YYYY/MM/DD-HH:mm:ss
     * @param value Date
     */
    public static formatSlashDateTimeAsFrenchDate(value: string) {
        const slashDateTime = this.fromSlashDateTime(value);
        return this.formatAsFrenchDate(slashDateTime);
    }

    /**
     * Vérifie si la date est une date valide
     * @param date Date
     */
    public static isValidDate(date: Date) {
        return isValid(date);
    }

    /**
     * Renvoie si la `date` est après la `target`
     * @param date Date
     * @param target Date de comparaison
     */
    public static isAfter(date: Date, target: Date) {
        return isAfter(date, target);
    }

    /**
     * Ajoute un nombre de minutes et renvoie la nouvelle date.
     * @param date Date
     * @param minutes Minutes à ajouter
     */
    public static addMinutes(date: Date, minutes: number) {
        return addMinutes(date, minutes);
    }

    /**
     * Soustrait un nombre d'années et renvoie la nouvelle date.
     * @param date Date
     * @param years Années à soustraire
     */
    public static subtractYears(date: Date, years: number) {
        return subYears(date, years);
    }

    /**
     * Soustrait un nombre de mois et renvoie la nouvelle date.
     * @param date Date
     * @param months Mois à soustraire
     */
    public static subtractMonths(date: Date, months: number) {
        return subMonths(date, months);
    }

    /**
     * Défini la date au début du jour et renvoie la nouvelle date.
     * @param date Date
     */
    public static startOfDay(date: Date) {
        return startOfDay(date);
    }

    /**
     * Défini la date à la fin du jour et renvoie la nouvelle date.
     * @param date Date
     */
    public static endOfDay(date: Date) {
        return endOfDay(date);
    }

    /**
     * Défini la date au début de l'année et renvoie la nouvelle date.
     * @param date Date
     */
    public static startOfYear(date: Date) {
        return startOfYear(date);
    }

    /**
     * Défini la date à la fin de l'année et renvoie la nouvelle date.
     * @param date Date
     */
    public static endOfYear(date: Date) {
        return endOfYear(date);
    }
}