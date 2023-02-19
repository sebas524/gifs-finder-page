import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Datum, SearchGIFRes } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'IsOK4uXlwd1X14BoIkZBPEK5FqwxwhZj'

  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  private _searchHistory: string[] = []

  public results: Datum[] = [];

  get searchHistory(){
    return [...this._searchHistory]
  }

  constructor(private http:HttpClient){

    this._searchHistory = JSON.parse(localStorage.getItem('searchHistoryGifDB')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
    // storage part 2:
    

  }


  search4gifs(query:string = ""){

    query = query.trim().toLowerCase();

    if(!this._searchHistory.includes(query)){

      this._searchHistory.unshift(query)
      this._searchHistory = this._searchHistory.splice(0,10);

      // storage part 1:
      localStorage.setItem("searchHistoryGifDB", JSON.stringify(this._searchHistory) )
    }

    console.log(this._searchHistory);


    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', "10")
      .set('q', query)




    this.http.get<SearchGIFRes>(`${this.serviceUrl}/search`,{params:params}).subscribe((res) =>{
      console.log(res.data);
      this.results = res.data

      // storage part 2:
      localStorage.setItem("results", JSON.stringify(this.results))

      
    })

  }

   
  

}
