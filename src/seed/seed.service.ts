import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke_response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/interfaces/axios.adapters';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}



 async executeSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemon

    const  data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonInsert : {name:string, no:number}[] = [];
    data.results.forEach(e => {


      const segments = e.url.split('/');

      const name = e.name;
      const no = +segments[segments.length -2];

      pokemonInsert.push({name,no});
    });

    await this.pokemonModel.insertMany(pokemonInsert);

    return 'Seed Executed';
  }




}
