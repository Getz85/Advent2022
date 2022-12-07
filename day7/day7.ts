/**
 * Day 7 - Puzzle 1
 * Given the input of commands as string, return the sum of all directories with a size less than maxSize
 * @param input
 * @param maxSize
 */
export function countDirectoriesTotalSize(input: string, maxSize: number): number {
    const treeFiles = getTreeFilesFromInput(input);
    const dirSizes = getDirSizes(treeFiles);
    return dirSizes.filter(dirSize => dirSize.size <= maxSize).reduce((nb, dirSize) => nb + dirSize.size, 0);
}

/**
 * Get the size of the best directory to remove to get enough free space in file system
 * @param input
 * @param fileSystemSize The max size of the file system
 * @param spaceRequired The space needed on the file system
 */
export function getDirectorySizeToRemove(input: string, fileSystemSize: number, spaceRequired: number): number {
    const treeFiles = getTreeFilesFromInput(input);
    const dirSizes = getDirSizes(treeFiles);
    const totalSize = dirSizes.find(dirSize => dirSize.path === "/")?.size;
    if (!totalSize) {
        throw new Error("Unable to count total size");
    }
    const unusedSpace = fileSystemSize - totalSize;
    const freeSpaceNeeded = spaceRequired - unusedSpace;
    if (freeSpaceNeeded > 0) {
        const dirToRemove = dirSizes.reduce((bestDirSize: DirSize | null, dirSize) => {
            if (dirSize.size > freeSpaceNeeded) {
                if (bestDirSize) {
                    return dirSize.size < bestDirSize.size ? dirSize : bestDirSize;
                }
                return dirSize;
            }
            return bestDirSize;
        }, null);
        return dirToRemove?.size ?? 0;
    } else {
        return 0;
    }
}

interface DirSize {
    path: string,
    size: number
}

function getDirSizes(dir: Day7.Directory): Array<DirSize> {
    return [{path: dir.path, size: dir.size}, ...dir.directories.flatMap(d => getDirSizes(d))];
}

/**
 * Return a tree of files and directory from the input.
 * @param input
 */
function getTreeFilesFromInput(input: string): Day7.Directory {
    const treeFiles = new Day7.Directory("/");
    const lines = input.split("\n");
    let currentPath: string = "/";
    for (const line of lines) {
        if (line.startsWith("$")) {
            // It's a command line
            const [, cmd, arg] = line.split(" ");
            if (cmd === "cd") {
                currentPath = getCurrentPath(arg, currentPath);
            }
            // We can ignore ls, we know that if it's not a command line, that's ls output
        } else {
            let currentDirectory = treeFiles.getSubDirectory(currentPath);
            const [arg1, arg2] = line.split(" ");
            if (arg1 === "dir") {
                currentDirectory.addDirectory(arg2);
            } else {
                // It's a file
                currentDirectory.addFile(new Day7.File(arg2, parseInt(arg1)));
            }
        }
    }
    return treeFiles;
}

function getCurrentPath(argument: string, currentPath: string | null) {
    switch (argument) {
        case "/":
            return "/";
        case "..":
            return currentPath?.split("/").slice(0, -1).join("/") ?? "/";
        default:
            return `${currentPath}${currentPath?.endsWith("/") ? "" : "/"}${argument}`;
    }
}


namespace Day7 {
    export class Directory {
        protected _files: File[] = [];
        protected _directories: Directory[] = [];

        constructor(protected _path: string) {
        }

        get path() {
            return this._path;
        }

        get name() {
            return this._path.split("/").pop();
        }

        get directories() {
            return this._directories;
        }

        /**
         * The size of a directory is the size of his files + the size of all subdirectories
         */
        get size(): number {
            const filesSize = this._files.reduce((size, file) => size + file.size, 0);
            return filesSize + this._directories.reduce((size, d) => size + d.size, 0);
        }

        /**
         * Add a file in current directory if not already exists
         * @param file
         */
        addFile(file: File) {
            if (!this._files.some(f => f.name === file.name)) {
                this._files.push(file);
            }
        }

        /**
         * Add a directory by his name if not already exists and return it
         * @param name
         */
        addDirectory(name: string): Directory {
            let dir = this._directories.find(d => d.name === name);
            if (!dir) {
                dir = new Day7.Directory(`${this.path}${this.path?.endsWith("/") ? "" : "/"}${name}`);
                this._directories.push(dir);
            }
            return dir;
        }

        /**
         * Get a subdirectory by his path (creates each one if not exists)
         * @param path
         */
        getSubDirectory(path: string): Directory {
            if (path === this.path) {
                return this;
            }
            const [, name, ...subDirectories] = path.split("/");
            let dir = this.addDirectory(name);
            if (subDirectories.length > 0) {
                return dir.getSubDirectory("/" + subDirectories.join("/"));
            } else {
                return dir;
            }
        }
    }

    export class File {
        constructor(protected _name: string, protected _size: number) {
        }

        get size() {
            return this._size;
        }

        get name() {
            return this._name
        }
    }
}