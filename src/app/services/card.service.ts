import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResourceType } from "../components/game/game.constants";
import {
  PeopleProperties,
  Resource,
  ResourceTOC,
  StarhipsProperties,
} from "./card.interface";
import {
  catchError,
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  retry,
} from "rxjs";
import { fromPairs, random } from "lodash/fp";

const SWAPI_URL = "https://www.swapi.tech/api/";
const NUMBER_OF_CARDS = 2;

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(private httpClient: HttpClient) {}

  getTotalAvailableResources(
    resourceTypes: ResourceType[],
  ): Promise<{ [key: string]: number }> {
    const requests = resourceTypes.map((rt, i) => {
      const url = `${SWAPI_URL}${rt}`;
      return this.httpClient.get<ResourceTOC>(url).pipe(
        map((r) => [resourceTypes[i], r.total_records]),
        retry({ count: 3, delay: 1000, resetOnSuccess: true }),
      );
    });
    return firstValueFrom(
      forkJoin(requests).pipe(map((resources) => fromPairs(resources))),
    );
  }

  getNewRandomCards(
    resourceType: ResourceType,
    availableResourcesForType: number,
  ): Promise<(PeopleProperties | StarhipsProperties)[]> {
    const requests = Array.from(new Array(NUMBER_OF_CARDS)).map(() => {
      return this.getNewRandomCard(
        resourceType,
        availableResourcesForType,
      ).pipe(
        catchError(() => {
          return this.getNewRandomCard(resourceType, availableResourcesForType);
        }),
        retry({ count: 3, delay: 1000, resetOnSuccess: true }),
      );
    });
    return firstValueFrom(forkJoin(requests));
  }

  private getNewRandomCard(
    resourceType: ResourceType,
    availableResourcesForType: number,
  ): Observable<PeopleProperties | StarhipsProperties> {
    const randomResourceId = random(1, availableResourcesForType);
    const url = `${SWAPI_URL}${resourceType}/${randomResourceId}`;
    return this.httpClient
      .get<Resource>(url)
      .pipe(map((resource) => resource.result.properties));
  }
}
