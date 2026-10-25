"""使用 Python 标准库实现的命令行问候程序。"""

import argparse
from collections.abc import Sequence


def greet(name: str = "世界") -> str:
    """移除姓名首尾空白，并返回问候语。"""
    name = name.strip()
    if not name:
        raise ValueError("姓名不能为空")
    return f"你好，{name}！"


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="输出一句中文问候语")
    parser.add_argument("name", nargs="?", default="世界", help="要问候的姓名")
    args = parser.parse_args(argv)
    try:
        print(greet(args.name))
    except ValueError as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
