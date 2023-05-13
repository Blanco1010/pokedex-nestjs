import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/interfaces/axios.adapters';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
