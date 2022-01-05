
// ..\jp-core\WebApi\Justizportal.WebApi\DtoModels\DtoAkteneinsicht.cs
export interface DtoAkteneinsicht {
    id: string;
    aktenzeichen: string;
    kurzrubrum: string;
    nurVorschau: boolean;
    bereitstellung: string;
    ablauf: string;
    datei: DtoDatei;
}

// ..\jp-core\WebApi\Justizportal.WebApi\DtoModels\DtoDatei.cs
export interface DtoDatei {
    id: string;
    dateiname: string;
    mimeType: string;
    size?: number;
}

// ..\jp-core\WebApi\Justizportal.WebApi\DtoModels\DtoDetail.cs
export interface DtoDetail {
    id: string;
    nummer: number;
    datum: string;
    art: string;
    beschreibung: string;
    datei: DtoDatei;
}

// ..\jp-core\WebApi\Justizportal.WebApi\DtoModels\LoginInformations.cs
export interface LoginInformations {
    username: string;
    password: string;
}

// ..\jp-core\Justizportal.Business\Models\Auth\AuthInfo.cs
export interface AuthInfo {
    token: string;
    expiresIn: number;
}

// ..\jp-core\Justizportal.Business\Models\Auth\AuthResult.cs
export interface AuthResult {
    returnCode: ReturnCodes;
    authInfo: AuthInfo;
    errorInfo: ErrorInfo;
}

// ..\jp-core\Justizportal.Business\Models\Auth\ErrorInfo.cs
export interface ErrorInfo {
    unlockedIn: number;
    internalMessage: string;
}
// ..\jp-core\WebApi\Justizportal.WebApi\DtoModels\DtOStatistic.cs
export interface DtOStatistic {
    hour: number;
    day: string;
    controller: String;
    action: String;
    count: number;
}
// ..\jp-core\WebApi\Justizportal.WebApi\DtoModels\StatisticParams.cs
export interface StatisticParams {
    password: string;
    startDate: string;
    endDate: string;
}
// ..\jp-core\Justizportal.Business\Models\Auth\ReturnCodes.cs
export enum ReturnCodes {
    Ok = 'OK',
    ErrorWrongCredentials = 'ErrorWrongCredentials',
    ErrorUserExpired = 'ErrorUserExpired',
    ErrorUserLocked = 'ErrorUserLocked',
    ErrorUnknown = 'ErrorUnknown',
}
