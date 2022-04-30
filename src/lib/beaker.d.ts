// beaker.d.ts

namespace Capabilities {
  export interface Api {}
}

namespace Contacts {
  export interface Api {}
}

namespace Hyperdrive {
  export interface Api {
    drive(url: string): Hyperdrive
    createDrive({
      title,
      description,
      tags,
      prompt,
    }: CreateDriveOptions): Promise<Hyperdrive>
    forkDrive(url: string, opts?: ForkDriveOptions): Promise<Hyperdrive>
    getInfo(url: string, opts?: GetInfoOptions): Promise<Info>
    stat(url: string, opts?: StatOptions): Promise<Stat>
    readFile(url: string, opts?: BinaryReadFileOptions): Promise<Uint8Array>
    readFile(url: string, opts?: EncodedReadFileOptions): Promise<string>
    readdir(
      url,
      opts?: ReadDirOpts,
    ): Promise<(string | { name: string; stat: Stat })[]>
    query(query: Query): Promise<Answer[]>
  }

  export interface Hyperdrive {
    forkDrive(opts?: ForkDriveOptions): Promise<Hyperdrive>
    getInfo(opts?: GetInfoOptions): Promise<Info>
    stat(opts?: StatOptions): Promise<Stat>
    readFile(url: string, opts?: BinaryReadFileOptions): Promise<Uint8Array>
    readFile(url: string, opts?: EncodedReadFileOptions): Promise<string>
    readdir(
      url: string,
      opts?: ReadDirOpts,
    ): Promise<(string | { name: string; stat: Stat })[]>
    query(query: Query): Promise<Answer[]>
  }

  export interface CreateDriveOptions {
    title: string
    description: string
    tags: string
    prompt: boolean
  }

  export interface ForkDriveOptions {
    detached: boolean
    title: string
    description: string
    tags: string
    prompt: boolean
  }

  export interface GetInfoOptions {
    timeout: number
  }

  export interface Info {
    key: string
    url: string
    writable: boolean
    version: number
    title: string
    description: string
  }

  export interface StatOptions {
    lstat: boolean
    timeout: number
  }

  export interface Stat {
    isFile(): boolean
    isDirectory(): boolean
    size: number
    blocks: number
    mtime: number
    ctime: number
    mount: { key: string; version: number }
    metadata: Metadata
    linkname: string
  }

  interface ReadFileOptions {
    encoding: FileEncoding
    timeout: number
  }

  export interface BinaryReadFileOptions extends ReadFileOptions {
    encoding: 'binary'
  }

  export interface EncodedReadFileOptions extends ReadFileOptions {
    encoding: Exclude<FileEncoding, 'binary'>
  }

  export interface ReadDirOpts {
    includeStats: boolean
    recursive: boolean
    timeout: number
  }

  export interface Query {
    drive?: string | string[]
    path: string | string[]
    type?: EntryType
    mount?: string
    metadata?: { [string]: string }
    sort?: QuerySort
    reverse?: boolean
    limit?: number
    offset?: number
    timeout?: number
  }

  export interface Answer {
    type: EntryType
    path: string
    url: string
    stat: Stat
    drive: string
    mount: string
    origin: {
      path: string
      drive: string
      url: string
    }
  }

  export type EntryType = 'file' | 'directory' | 'mount'
  export type QuerySort = 'name' | 'ctime' | 'mtime'
  export type FileEncoding = 'binary' | 'utf8' | 'hex' | 'json' | 'base64'
}

namespace Markdown {
  export interface Api {}
}

namespace Panes {
  export interface Api {}
}

namespace Peersockets {
  export interface Api {}
}

namespace Shell {
  export interface Api {}
}

namespace Terminal {
  export interface Api {}
}

export interface Beaker {
  capabilities: Capabilities.Api
  contacts: Contacts.Api
  hyperdrive: Hyperdrive.Api
  markdown: Markdown.Api
  panes: Panes.Api
  peersockets: Peersockets.Api
  shell: Shell.Api
  terminal: Terminal.Api
}

export declare global {
  interface Window {
    beaker: Beaker
  }
}
