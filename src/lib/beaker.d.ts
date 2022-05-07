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
    diff(
      url: string,
      other: number | string | Hyperdrive,
      prefix?,
      opts?: DiffOptions,
    ): Promise<Array<Diff>>
    configure(
      url: string,
      settings: Settings,
      opts?: ConfigureOptions,
    ): Promise<void>
    writeFile(
      url: string,
      data: Uint8Array,
      opts?: BinaryWriteFileOptions,
    ): Promise<void>
    writeFile(
      url: string,
      data: string,
      opts?: EncodedWriteFileOptions,
    ): Promise<void>
    mkdir(url: string, opts?: MkdirOptions): Promise<void>
    symlink(target: string, url: string, opts?: SymlinkOptions): Promise<void>
    mount(
      url: string,
      mount: string | Hyperdrive | { key: string; version: number | string },
      opts?: MountOptions,
    ): Promise<void>
    copy(src: string, dst: string, opts?: CopyOptions): Promise<void>
  }

  export interface Hyperdrive {
    url: string
    version: string | number | null
    forkDrive(opts?: ForkDriveOptions): Promise<Hyperdrive>
    getInfo(opts?: GetInfoOptions): Promise<Info>
    stat(opts?: StatOptions): Promise<Stat>
    readFile(url: string, opts?: BinaryReadFileOptions): Promise<Uint8Array>
    readFile(url: string, opts?: EncodedReadFileOptions): Promise<string>
    readdir(url?: string, opts?: ReadDirOpts): Promise<string[]>
    readdir(
      url?: string,
      opts?: ReadDirOptsIncludeStats,
    ): Promise<{ name: string; stat: Stat }[]>
    query(query: Query): Promise<Answer[]>
    diff(
      url: string,
      other: number | string | Hyperdrive,
      prefix?,
      opts?: DiffOptions,
    ): Promise<Array<Diff>>
    configure(settings: Settings, opts: ConfigureOptions): Promise<void>
    writeFile(
      url: string,
      data: Uint8Array,
      opts?: BinaryWriteFileOptions,
    ): Promise<void>
    writeFile(
      url: string,
      data: string,
      opts?: EncodedWriteFileOptions,
    ): Promise<void>
    mkdir(url: string, opts?: MkdirOptions): Promise<void>
    symlink(target: string, url: string, opts?: SymlinkOptions): Promise<void>
    mount(
      url: string,
      mount: string | Hyperdrive | { key: string; version: number | string },
      opts?: MountOptions,
    ): Promise<void>
    copy(src: string, dst: string, opts?: CopyOptions): Promise<void>
  }

  interface TimeoutOptions {
    timeout?: number
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

  export interface GetInfoOptions extends TimeoutOptions {}

  export interface Info {
    key: string
    url: string
    writable: boolean
    version: number
    title: string
    description: string
  }

  export interface StatOptions extends TimeoutOptions {
    lstat: boolean
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

  interface ReadFileOptions extends TimeoutOptions {
    encoding: FileEncoding
    timeout: number
  }

  export interface BinaryReadFileOptions extends ReadFileOptions {
    encoding: 'binary'
  }

  export interface EncodedReadFileOptions extends ReadFileOptions {
    encoding: Exclude<FileEncoding, 'binary'>
  }

  export interface ReadDirOpts extends TimeoutOptions {
    includeStats?: false
    recursive?: boolean
  }

  export interface ReadDirOptsIncludeStats extends TimeoutOptions {
    includeStats: true
    recursive?: boolean
  }

  export interface Query extends TimeoutOptions {
    drive?: string | string[]
    path: string | string[]
    type?: EntryType
    mount?: string
    metadata?: { [string]: string }
    sort?: QuerySort
    reverse?: boolean
    limit?: number
    offset?: number
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

  export interface DiffOptions extends TimeoutOptions {}

  export interface Diff {
    type: DiffType
    name: string
    value: any // no idea what can be here, actually
  }

  export interface Settings {
    title: string
    description: string
  }

  export interface ConfigureOptions extends TimeoutOptions {}

  interface WriteFileOptions extends TimeoutOptions {
    metadata: { [key: string]: string }
  }

  export interface BinaryWriteFileOptions extends WriteFileOptions {
    encoding: 'binary'
  }

  export interface EncodedWriteFileOptions extends WriteFileOptions {
    encoding: Exclude<FileEncoding, 'binary'>
  }

  export interface MkdirOptions extends TimeoutOptions {}
  export interface SymlinkOptions extends TimeoutOptions {}
  export interface MountOptions extends TimeoutOptions {}
  export interface CopyOptions extends TimeoutOptions {}

  export type EntryType = 'file' | 'directory' | 'mount'
  export type QuerySort = 'name' | 'ctime' | 'mtime'
  export type FileEncoding = 'binary' | 'utf8' | 'hex' | 'json' | 'base64'
  export type DiffType = 'put' | 'del' | 'mount' | 'unmount'
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
